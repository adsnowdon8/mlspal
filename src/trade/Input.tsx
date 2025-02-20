import { useCallback, useEffect, useMemo, useState } from "react";
import { playersJson } from "../playerTable/Players";
import { teamsJson } from "../Teams";
import axios from "axios";
import {
  document_prefix_prompt,
  GEMINI_ENDPOINT,
  LOCAL_ENDPOINT,
  MLS_TRADE_RULES,
  USERNAME,
} from "../constants";
import teaminfo from "../data/mls_teams.json";
import { formatTextToHTML, splitOnPeriods } from "../utils";

export const InputView: React.FC<{
  // prompViewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}> = () => {
  const [player, setPlayer] = useState<string>();
  const [team, setTeam] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [questionsAsked, setQuestionsAsked] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");

  const createPost = useCallback(
    (endpoint: string) => {
      console.log(endpoint);
      const constructedQuestion = player + " to " + team;
      // ". what does the provided information tell us about this?";
      console.log({ creating: constructedQuestion });
      if (!constructedQuestion) return;

      setLoading(true);
      setQuestionsAsked((q) => [...q, question]);
      const context: string =
        document_prefix_prompt +
        JSON.stringify({
          Player: "Grayson Doody",
          Position: "Right Back",
          Age: 22,
          Base_Salary: "$71,401.00",
          Guaranteed_Compensation: "$77,383.00",
          Nationality: "USA",
          Contract_End: "",
          Club: "CF Montreal",
        }) +
        MLS_TRADE_RULES +
        JSON.stringify(teaminfo);

      const sendString = context + "USER: " + constructedQuestion + "\n\n";

      setQuestion("");
      console.log(sendString);
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
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
    [player, question, team]
  );

  const formattedResponse = useMemo(() => {
    const formattedSentence = formatTextToHTML(response);
    return (
      <p
        className="p-5"
        dangerouslySetInnerHTML={{ __html: formattedSentence }}
      />
    );
  }, [response]);

  return (
    // <div className="absolute flex flex-col h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
    <div className="h-full flex flex-col items-center justify-center gap-2 pb-40">
      <div className="mb-3">
        {"Select a player: "}
        <select
          onChange={(e) => setPlayer(e.target.value)}
          value={player}
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
          onChange={(e) => setTeam(e.target.value)}
          value={team}
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
        onClick={() => createPost(GEMINI_ENDPOINT)}
        disabled={player === undefined || team === undefined}
      >
        {" Trade "}
      </button>

      {response && response !== "" && formattedResponse}
    </div>
  );
};
