import players from "../data/players_6_19_25.json";

export type Player = {
  // First_Name: string;
  // Last_Name: string;
  Shirt_Number: string;
  Name: string;
  Contract_End: string;
  Option_Years: string;
  Team: string;
  Age: number;
  Position: string;
  Nationality: string;
  Domestic_or_International: string;
  Minutes_Played: string;
  Roster_Designation: string;
};
export const playersJson: Player[] = players;

export type PlayerStat = {
  player_id: string;
  first_name: string;
  last_name: string;
  team: string;
  goals: number;
  assists: number;
  shots: number;
  games_started: number;
  minutes: number | null;
  shirt_number: string | null;
  position: string | null;
  age: number | null;
  nationality: string | null;
};
