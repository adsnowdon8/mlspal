import os
import psycopg2
import requests
from psycopg2.extras import execute_values
from dotenv import load_dotenv
load_dotenv()

conn_string = os.getenv("DATABASE_URL")


# base_url = "https://sportapi.mlssoccer.com/api/stats/players/competition/MLS-COM-000001/season/MLS-SEA-0001K9/order/goals/desc"
base_url = "https://sportapi.mlssoccer.com/api/stats/players/competition/MLS-COM-000001/season/MLS-SEA-0001K9/order/goals/desc?pageSize=30&page="

conn = psycopg2.connect(conn_string)

cur = conn.cursor()
page = 1
page_size = 30

all_players = []


while True:
    req_url = base_url+str(page)
    resp = requests.get(req_url)
    data = resp.json()
    players = data
    print(len(players))
    if not players:
        print('broke')
        break
    for player in players:
        all_players.append((
        player.get('player_id'),
        player.get('goals', 0),
        player.get('assists', 0),
        player.get('normalized_player_minutes', 0),
        player.get('games_started',0)
        ))

    page_len = len(data)
    if page_len < 30:
        break
    page += 1

print(f"Fetched {len(all_players)} players")

unique_players = {p[0]: p for p in all_players}
players_to_insert = []

for player_id, player in unique_players.items():
    players_to_insert.append(player)
print(players_to_insert)

print(len(unique_players), ' unique rows')

insert_query = """
    INSERT INTO public.player_data (
        player_id, goals, assists, normalized_player_minutes, games_started
    )
    VALUES %s
    ON CONFLICT (player_id) DO UPDATE SET
        goals = EXCLUDED.goals,
        assists = EXCLUDED.assists,
        normalized_player_minutes = EXCLUDED.normalized_player_minutes,
        games_started = EXCLUDED.games_started
"""

execute_values(cur, insert_query, players_to_insert)
conn.commit()
cur.close()
conn.close()




