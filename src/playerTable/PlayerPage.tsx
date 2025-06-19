import { useParams } from "react-router-dom";
import { playersJson } from "./Players";

const fetchPlayerDetails = (playerId: string | undefined) => {
  if (!playerId) {
    return null;
  }
  const [firstName, lastName] = playerId.split(" ");
  const pid = playerId.trim().replace(/\s+/g, "").toLowerCase();
  const player = playersJson.find((player) => {
    const pfid = player.Name.toLowerCase().replace(/\s+/g, "");

    return pfid === pid;
  });

  if (player) {
    return {
      ...player,
      fullName: `${player.Name}`,
    };
  }
  return null;
};

export const PlayerPage = () => {
  const { playerId } = useParams();
  console.log("Player ID:", playerId);

  // Fetch player details using playerId if needed
  const playerDetails = fetchPlayerDetails(playerId);
  console.log("Player Details:", playerDetails);

  return (
    <div className="flex flex-col items-center p-5 text-gray-800">
      <div>
        <div className="flex  items-center">
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#fff",
            }}
          >
            {playerId?.charAt(0).toUpperCase()}
          </div>
          <h1 className="p-5 text-2xl font-bold"> {playerId} </h1>
        </div>
        <div className="flex flex-col items-start gap-2 pl-3">
          <p className="">
            {playerDetails ? `Team: ${playerDetails.Team}` : "Team not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Position: ${playerDetails.Position}`
              : "Position not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Shirt Number: ${playerDetails.Shirt_Number}`
              : "Shirt Number not found"}
          </p>

          <p className="">
            {playerDetails ? `Age: ${playerDetails.Age}` : "Age not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Minutes Played: ${playerDetails.Minutes_Played}`
              : "Minutes Played not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Contract End: ${playerDetails.Contract_End}`
              : "Contract End not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Option Years: ${playerDetails.Option_Years}`
              : "Option Years not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Nationality: ${playerDetails.Nationality}`
              : "Nationality not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Domestic or International: ${playerDetails.Domestic_or_International}`
              : "Domestic or International not found"}
          </p>
          <p className="">
            {playerDetails
              ? `Roster Designation: ${playerDetails.Roster_Designation}`
              : "Roster Designation not found"}
          </p>
        </div>
      </div>
    </div>
  );
};
