import requests
from datetime import datetime, date
from unidecode import unidecode
import json

import os
import psycopg2
from psycopg2.extras import execute_values

from dotenv import load_dotenv
load_dotenv()

conn_string = os.getenv("DATABASE_URL")

#make player lookup for nationality
with open("src/data/players_6_19_25.json", "r") as f:
    players = json.load(f)
player_name_to_nationality = {unidecode(p["Name"]): p["Nationality"] for p in players}
# player_lookup = {p["Name"]: p for p in players}
# # Example lookup:
# player = player_lookup["Diego Rubio"]



def make_player_by_team_url(club_id):
    return 'https://sportapi.mlssoccer.com/api/players/byClub/' + club_id +'?culture=en-us'

def get_teams():    
    team_url = "https://stats-api.mlssoccer.com/clubs/competitions/MLS-COM-000001/seasons/MLS-SEA-0001K9?per_page=100"

    resp = requests.get(team_url)
    data = resp.json()
    clubs = data.get('clubs') 
    return clubs

teams = get_teams()
players_to_insert = []

#connect to DB
conn = psycopg2.connect(conn_string)
# conn = psycopg2.connect(dbname='your_db_name', user='db_user_name', password='db_user_password', host='your_rds_postgres_endpoint', port='5432', sslmode='require')

cursor = conn.cursor()

base_players_by_team_url = 'https://sportapi.mlssoccer.com/api/players/byClub/MLS-CLU-00000N?culture=en-us'
for team in teams:
    team_name = team.get('club_name')
    print('accessing ', team_name , "'s players")
    club_id = team.get('club_id')
    url = make_player_by_team_url(club_id)
    resp = requests.get(url)
    players = resp.json()
    
    for player in players:
        player_id = player.get('sportecId')

        name = f"{player.get('firstName', '').strip()} {player.get('lastName', '').strip()}".strip()

        shirt_number = player.get('jerseyNumber')
        shirt_number = int(shirt_number) if shirt_number.isdigit() else  None

        position = player.get('position')
        club = team_name

        dob_str = player.get('dateOfBirth')
        if dob_str:
            try:
                # Parse the string into a datetime
                dob_datetime = datetime.strptime(dob_str, '%m/%d/%Y %H:%M:%S')
                # Extract the date part only
                dob = dob_datetime.date()  # this is a datetime.date object
            except ValueError:
                dob = None
        else:
            dob = None

        thumbnail = player.get('thumbnail')
        headshot_url = thumbnail.get('thumbnailUrl') if thumbnail else None
        nationality = player_name_to_nationality.get(unidecode(name))

        height = player.get('height')
        weight = player.get('weight')
        players_to_insert.append((player_id, name, shirt_number, position, club, dob, headshot_url, nationality, height, weight))

# print(players_to_insert)
print(len(players_to_insert), ' players to insert' )

#now insert into DB with single query (faster)
insert_query = """
    INSERT INTO public.players (
        player_id, name, shirt_number, position, club, dob, headshot_url, nationality, height, weight
    )
    VALUES %s
    ON CONFLICT (player_id) DO UPDATE SET
        name = EXCLUDED.name,
        shirt_number = EXCLUDED.shirt_number,
        position = EXCLUDED.position,
        club = EXCLUDED.club,
        dob = EXCLUDED.dob,
        headshot_url = EXCLUDED.headshot_url,
        nationality = EXCLUDED.nationality,
        height = EXCLUDED.height,
        weight = EXCLUDED.weight;
"""

execute_values(cursor, insert_query, players_to_insert)

conn.commit()
cursor.close()
conn.close()
