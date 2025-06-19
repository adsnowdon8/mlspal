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
