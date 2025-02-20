import players from "../data/players_transformed.json";

export type Player = {
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  baseSalary: string;
  guaranteedCompensation: string;
  nationality: string;
  contractEnd: string;
  club: string;
  combinedRowInfo?: string;
};
export const playersJson: Player[] = players;
