import teams from "./data/teams.json";
import teamsEast from "./data/EastTeams_6_19_25.json";
import teamsWest from "./data/WestTeams_6_19_25.json";

export type Team = {
  Points?: string;
  Team: string;
  Coach: string;
  Owner: string;
  GM: string;
  City: string;
  Number_of_Roster_Slots_Filled: string;
  Roster_Model: string;
  International_Slots_Filled: string;
};
export const teamsJson: Team[] = teams;
export const teamsEastJson: Team[] = teamsEast;
export const teamsWestJson: Team[] = teamsWest;

export const mlsTeamColorClasses = {
  "Atlanta United": "bg-red-200",
  "Charlotte FC": "bg-sky-200",
  "Chicago Fire": "bg-red-300",
  "FC Cincinatti": "bg-orange-200",
  "Columbus Crew": "bg-yellow-200",
  "DC United": "bg-neutral-300",
  "Inter Miami": "bg-pink-200",
  "CF Montreal": "bg-cyan-200",
  "Nashville FC": "bg-yellow-100",
  "NE Revolution": "bg-indigo-100",
  "New York City FC": "bg-blue-200",
  "NY Red Bulls": "bg-rose-200",
  "Orlando City": "bg-purple-200",
  "Philadelphia Union": "bg-emerald-200",
  "Toronto FC": "bg-rose-300",

  // west
  "Austin FC": "bg-green-200",
  "Colorado Rapids": "bg-rose-200",
  "FC Dallas": "bg-red-200",
  "Houston Dynamo": "bg-amber-200",
  "LA Galaxy": "bg-indigo-100",
  LAFC: "bg-yellow-100",
  Minnesota: "bg-blue-100",
  "Portland Timbers": "bg-green-300",
  "Real Salt Lake": "bg-red-100",
  "San Diego FC": "bg-sky-100",
  "San Jose Earthquakes": "bg-blue-200",
  "Seattle Sounders": "bg-emerald-200",
  "Sporting KC": "bg-blue-300",
  "St Louis City SC": "bg-fuchsia-200",
  "Vancouver Whitecaps": "bg-cyan-100",
} as const;
