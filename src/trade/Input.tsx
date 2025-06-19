import { useCallback, useMemo, useState } from "react";
import { playersJson } from "../playerTable/Players";
import { teamsJson } from "../Teams";
import axios from "axios";
import { server_GEMINI_ENDPOINT, USERNAME } from "../constants";
import { ResponseComponent } from "./ResponseComponent";
import "./Input.css";

// import Select from "react-select";
import ReactSelect, { SingleValue } from "react-select";

// import "./trade.css";
const undefinedOption = { label: "", value: "" };

export const InputView: React.FC<{
  // prompViewState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}> = () => {
  const [selectedPlayer, setSelectedPlayer] =
    useState<SingleValue<{ label: string; value: string }>>();
  const [selectedTeam, setSelectedTeam] =
    useState<SingleValue<{ label: string; value: string }>>();

  const [loading, setLoading] = useState<boolean>();
  const [questionsAsked, setQuestionsAsked] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");
  // someArrayOfStrings.map(opt => ({ label: opt, value: opt }));

  const playerOptions = useMemo(() => {
    return playersJson
      .sort((a, b) => a.Name.localeCompare(b.Name))
      .map(
        (player) => {
          return {
            label: player.Name,
            value: player.Name,
          };
        }
        // <option value={player.First_Name + " " + player.Last_Name}>
        //   {player.First_Name + " " + player.Last_Name}
        // </option>
      );
  }, []);

  const teamOptions = useMemo(() => {
    return teamsJson
      .sort((a, b) => a.Team.localeCompare(b.Team))
      .map((team) => {
        return {
          label: team.Team,
          value: team.Team,
        };
      });
    //  <option value={team.Team}>{team.Team}</option>);
  }, []);

  const createPost = useCallback(
    (endpoint: string) => {
      const constructedQuestion = selectedPlayer + " to " + selectedTeam;
      // ". what does the provided information tell us about this?";
      if (!constructedQuestion) return;
      setLoading(true);
      setQuestionsAsked((q) => [...q, question]);
      const playerInfo = playersJson.find(
        (player) =>
          // player.First_Name + " " + player.Last_Name === selectedPlayer?.value
          player.Name === selectedPlayer?.value
      );

      const playerCurrentClubInfo = teamsJson.find((team) => {
        return team.Team === playerInfo?.Team;
      });
      const proposedTeamInfo = teamsJson.find(
        (team) => team.Team === selectedTeam?.value
      );
      if (!playerInfo || !playerCurrentClubInfo || !proposedTeamInfo) {
        setLoading(false);
        return;
      }
      // JSON.stringify(teaminfo);
      // Give the answer as though you are a trade machine
      // Start your response with "MLS-pal thinks that and end your response with a disclaimer.
      setQuestion("");

      axios({
        method: "post",
        url: endpoint,
        data: {
          q: constructedQuestion,
          sol: "short",
          username: USERNAME,
          p: JSON.stringify(playerInfo),
          pc: JSON.stringify(playerCurrentClubInfo),
          pt: JSON.stringify(proposedTeamInfo),
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
      <div className="h-full flex items-center justify-center gap-2 overflow-auto relative">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        <div className="h-full flex flex-col items-center justify-center gap-5 pb-40">
          <h1 className="text-2xl font-bold pt-10">Trade Analysis</h1>
          <text className="w-1/2 ">
            Major League Soccer operates under a distinctive set of roster
            rules, salary caps, and player movement mechanisms that make trades
            both complex and exciting.
            <br />
            <br />
            Our MLS Trade Machine is built to navigate this unique
            landscape—analyzing potential trades from multiple angles to assess
            their feasibility, value, and strategic fit.
            <br />
            <br />
            Whether you’re a fan, analyst, or front-office enthusiast, our tool
            brings clarity to the possibilities
          </text>

          <div className=" flex items-center gap-1">
            <p> {"Select a Player: "}</p>
            <ReactSelect
              className="react-select min-w-80"
              classNamePrefix="react-select"
              options={[undefinedOption, ...playerOptions]}
              placeholder=""
              value={selectedPlayer}
              styles={{
                option: (provided) => ({
                  ...provided,
                  minHeight: "40px", // Set a minimum height for options
                  display: "flex",
                  alignItems: "center", // Ensure text is vertically centered
                }),
              }}
              onChange={(opt) =>
                setSelectedPlayer(opt?.label === "" ? undefined : opt)
              }
              maxMenuHeight={500}
            />
          </div>
          <div className="flex items-center gap-1">
            <p>Select a Team:</p>
            <ReactSelect
              className="react-select min-w-80"
              classNamePrefix="react-select"
              options={[undefinedOption, ...teamOptions]}
              styles={{
                option: (provided) => ({
                  ...provided,
                  minHeight: "40px", // Set a minimum height for options
                  display: "flex",
                  alignItems: "center", // Ensure text is vertically centered
                }),
              }}
              placeholder=""
              value={selectedTeam}
              onChange={(opt) =>
                setSelectedTeam(opt?.label === "" ? undefined : opt)
              }
            />
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
