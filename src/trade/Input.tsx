import { useCallback, useMemo, useState } from "react";
import { playersJson } from "../playerTable/Players";
import { teamsJson } from "../Teams";
import axios from "axios";
import {
  document_prefix_prompt,
  MLS_TRADE_RULES,
  server_GEMINI_ENDPOINT,
  USERNAME,
} from "../constants";
import { formatTextToHTML } from "../utils";
import { ResponseComponent } from "./ResponseComponent";

export const InputView: React.FC<{
  // prompViewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}> = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>();
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [questionsAsked, setQuestionsAsked] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");

  const createPost = useCallback(
    (endpoint: string) => {
      console.log(endpoint);
      const constructedQuestion = selectedPlayer + " to " + selectedTeam;
      // ". what does the provided information tell us about this?";
      console.log({ creating: constructedQuestion });
      if (!constructedQuestion) return;

      setLoading(true);
      setQuestionsAsked((q) => [...q, question]);
      const playerInfo = playersJson.find(
        (player) => player.firstName + " " + player.lastName === selectedPlayer
      );
      const playerCurrentClubInfo = teamsJson.find(
        (team) => team.teamName === playerInfo?.club
      );
      const proposedTeamInfo = teamsJson.find(
        (team) => team.teamName === selectedTeam
      );
      console.log("playerInfo", playerInfo, playerCurrentClubInfo);
      const context: string =
        document_prefix_prompt +
        'player information: "' +
        JSON.stringify(playerInfo) +
        '" current team information: "' +
        JSON.stringify(playerCurrentClubInfo) +
        '" proposed team information: "' +
        proposedTeamInfo +
        '" ' +
        // JSON.stringify({
        //   Player: "Grayson Doody",
        //   Position: "Right Back",
        //   Age: 22,
        //   Base_Salary: "$71,401.00",
        //   Guaranteed_Compensation: "$77,383.00",
        //   Nationality: "USA",
        //   Contract_End: "",
        //   Club: "CF Montreal",
        // }) +
        MLS_TRADE_RULES;
      // JSON.stringify(teaminfo);

      const sendString =
        context + " USER's proposed trade: " + constructedQuestion + "\n\n";

      setQuestion("");

      console.log({
        "Sending axios post request": {
          question: sendString,
          username: USERNAME,
        },
      });

      axios({
        method: "post",
        url: endpoint,
        data: {
          question: sendString,
          username: USERNAME,
        },
      })
        .then((response) => {
          console.log({ response });
          setLoading(false);
          setResponse(response.data);
          setResponses((r) => [...r, response.data]);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            setResponse(error.response.data);
          }
        });
    },
    [selectedPlayer, question, selectedTeam]
  );
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center gap-2">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <p>{"Loading..."}</p>
      </div>
    );
  }

  return (
    // <div className="absolute flex flex-col h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
    <>
      {response ? (
        <ResponseComponent response={response} setResponse={setResponse} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-2 pb-40">
          <div className="mb-3">
            {"Select a player: "}
            <select
              onChange={(e) => setSelectedPlayer(e.target.value)}
              value={selectedPlayer}
              className="border rounded"
            >
              <option value={undefined}></option>
              {playersJson
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((player) => (
                  <option value={player.firstName + " " + player.lastName}>
                    {player.firstName + " " + player.lastName}
                  </option>
                ))}
            </select>
          </div>
          <div>
            {"Select a team: "}
            <select
              onChange={(e) => setSelectedTeam(e.target.value)}
              value={selectedTeam}
              className="border rounded"
            >
              <option value={undefined}> </option>
              {teamsJson
                .sort((a, b) => a.teamName.localeCompare(b.teamName))
                .map((team) => (
                  <option value={team.teamName}>{team.teamName}</option>
                ))}
            </select>
          </div>

          <button
            className="bg-green-300 border rounded w-52 h-8 disabled:bg-gray-300"
            onClick={() => createPost(server_GEMINI_ENDPOINT)}
            disabled={
              selectedPlayer === undefined || selectedTeam === undefined
            }
          >
            {" Trade "}
          </button>
        </div>
      )}
    </>
  );
};
