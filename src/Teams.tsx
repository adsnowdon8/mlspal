import teams from "./data/teams.json";

export type Team = {
  teamName: string;
  location: string;
  // foundingYear: number;
  // rosterSlotsFilled: number;
  coach: string;
  owner: string;
  gm: string;
  position2024: string;
  made2024Playoffs: string;
};
export const teamsJson: Team[] = teams;
