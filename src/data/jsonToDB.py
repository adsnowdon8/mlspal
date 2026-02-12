import json

import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()
# Get the connection string from the environment variable
conn_string = os.getenv("DATABASE_URL")
conn = None

try:
    with psycopg2.connect(conn_string) as conn:
        print("Connection established")
        # Load JSON
        with open("data.json") as f:
            data = json.load(f)

        cur = conn.cursor()
        # Insert rows
        for row in data:
            cur.execute(
                "INSERT INTO players (name, shirtNumber, position, club, age, contractEnd, rosterDesignation, nationality, minutesPlayed) VALUES (%s, %s, %s,%s, %s, %s, %s, %s, %s ) ON CONFLICT (id) DO NOTHING",
                (row["Name"], row["Shirt_Number"], row["Position"], row["Team"], row[""])
            )

        conn.commit()
        cur.close()
        conn.close()


except Exception as e:
    print("Connection failed.")
    print(e)

    


