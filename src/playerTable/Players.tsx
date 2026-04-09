import players from "../data/players_6_19_25.json";

const SUPABASE_URL = "https://ajjkszzuppoowamauxcs.supabase.co";
const SUPABASE_KEY = "sb_publishable_M-kNsSSwYSR_TeNnhCkRKQ_6dQGV8rF";

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

function calculateAge(birthDate: string | null): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

export async function fetchPlayers(): Promise<PlayerStat[]> {
  const [statsRes, rosterRes] = await Promise.all([
    fetch(
      `${SUPABASE_URL}/rest/v1/player_stats?select=player_id,first_name,last_name,team,goals,assists,shots,games_started,minutes&order=goals.desc`,
      { headers: HEADERS },
    ),
    fetch(
      `${SUPABASE_URL}/rest/v1/player_roster?select=player_id,shirt_number,position,birth_date,nationality,team_name`,
      { headers: HEADERS },
    ),
  ]);

  if (!statsRes.ok) throw new Error(`player_stats: ${statsRes.statusText}`);
  if (!rosterRes.ok) throw new Error(`player_roster: ${rosterRes.statusText}`);

  const [stats, roster] = await Promise.all([
    statsRes.json(),
    rosterRes.json(),
  ]);

  const rosterMap = new Map(roster.map((r: any) => [r.player_id, r]));

  return stats.map((row: any) => {
    const r: any = rosterMap.get(row.player_id);
    return {
      player_id: row.player_id,
      first_name: row.first_name,
      last_name: row.last_name,
      team: r?.team_name ?? row.team,
      goals: row.goals,
      assists: row.assists,
      shots: row.shots,
      games_started: row.games_started,
      minutes: row.minutes,
      shirt_number: r?.shirt_number ?? null,
      position: r?.position ?? null,
      age: calculateAge(r?.birth_date ?? null),
      nationality: r?.nationality ?? null,
    };
  });
}
