import players from "../data/players.json";

export type Player = {
  First_Name: string;
  Last_Name: string;
  Contract_End: string;
  Option_Years: string;
  TEAM: string;
  Age: number;
  Position: string;
  Nationality: string;
  Domestic_or_International: string;
  Minutes_Played: string;
};
export const playersJson: Player[] = players;
