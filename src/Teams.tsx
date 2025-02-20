import teams from "./data/mls_teams.json";

export type Team = {
  teamName: string;
  location: string;
  foundingYear: number;
  rosterSlotsFilled: number;
  coach: string;
  owner: string;
  gm: string;
  position2024: string;
  madePlayoffs: string;
};
export const teamsJson: Team[] = teams;
