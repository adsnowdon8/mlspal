import teams from "./data/teams.json";

export type Team = {
  // teamName: string;
  // location: string;
  // // foundingYear: number;
  // // rosterSlotsFilled: number;
  // coach: string;
  // owner: string;
  // gm: string;
  // position2024: string;
  // made2024Playoffs: string;
  Team: string;
  Coach: string;
  Owner: string;
  GM: string;
  City: string;
  Position_End_Last_Season: string;
  MLS_Playoffs: string;
  Number_of_Roster_Slots_Filled: string;
  Roster_Model: string;
  International_Slots_Filled: string;
};
export const teamsJson: Team[] = teams;
