import players from "../data/young_players_6_25_25.json";

export type YoungPlayer = {
  // First_Name: string;
  // Last_Name: string;
  // Shirt_Number: string;
  Name: string;
  Minutes_Played: string;
  Team: string;
  DOB: string;
  Age: number;
  Position: string;
  Nationality: string;
  Foot: string;
};

export const NextProPlayersJson: YoungPlayer[] = players;
