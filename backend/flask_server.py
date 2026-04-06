import json
import os
import psycopg2
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv(".flaskenv")

from flask_cors import CORS
from consts import MLS_TRADE_RULES, document_prefix_prompt


# MLS_TRADE_RULES =   "Major League Soccer Rule Breakdown Salary Budget Information (2024) ● Salary budget per club: $5,470,000 ● Maximum allowed budget charge: $683,750 ● Senior (roster spot 1-24) minimum salary: $89,716 ● Reserve (roster spot 25-30) minimum salary: $71,401 ● Designated player budget charge: $683,750 ● 2nd designated player budget charges: $683,750 ● 3rd designated player budget charge: $683,750 ● Young (20 years or younger during league year) designated player budget charge: $150,000 ● Young (21-23 years old during league year) designated player budget charge: $200,000 ● Mid-season designated player budget salary charge: $341,875 ● Mid-season young (23 years of age or younger during league year) designated player budget charge : $341,875 ● Maximum targeted allocation money (TAM) amount: $1,683,750 ● u22 initiative slot budget charge (20 years or younger during league year): $150,000 ● u22 initiative slot budget charge (21-25 years old during league year): $200,000 2025 Roster ● Salary Budget Cap 2025 : $5,950,000 ● Senior Maximum Budget Charge 2025 (DP Cap Hit) : $743,750 ● As opposed to last year, every team’s GAM is public this year The Senior Roster ● Roster slots 1-20 ● Salaries count against $5,470,000 salary budget ● A club can have as little as 18 players on the senior roster, each unfilled slot under 18 will incur a minimum salary budget charge ($89,716) against the salary budget ● If a player on the senior roster is place on the injury list, the club may receive an additional roster spot but will not receive salary relief (must pay salary and it still counts towards total budget) ● If injured player is an international, additional roster spot can be an international slot ● The maximum allowed budget charge for a single player is $683,750 ● the total charge of a designated player’s salary to the budget can be bought down using GAM, this reduction may NOT be less than $150,000 ● GAM can also be used to buy down non-dp player salaries, reducing up to 50% of the original amount(no more than 50%). However, a reduced salary using GAM can’t fall below $150,000. (example: a $200,000 salary can only be reduced by $50,000 of GAM as anything more would mean a fall below the minimum allowed bought down charge using GAM of $150,000) ● If a player’s bonuses put him above the maximum charge by year end, club must use allocation money to cover additional costs The Supplemental Roster ● Roster slots 21-30 ● Subject to injuries and loans, club can’t have more than 10 players on supplemental roster ● Salaries do not count against salary budget ● All Generation Adidas players are part of this roster during the initial guaranteed term of their contract (3 years) ; guaranteed spot as a reserve player for any team that selects him for 3 years ● Slots 21-24: Players earning at least senior minimum salary ($89,716); players in these spots may include Homegrown players, GA players, drafted players, or Homegrown players earning above senior minimum salary subject to Homegrown Player Subsidy (earning $125,000 above reserve or senior minimum salary) ● Slots 25-30: players earning reserve minimum salary ($71,401), can include homegrown players, homegrown players earning above reserve minimum subject to homegrown player subsidy, GA players earning reserve minimum salary ● Players in slots 25-30, must be 24 years or younger during the league year Homegrown Player Subsidy ● Homegrown players that form part of the supplemental roster (slots 21-30) can earn up to $125,000 above the reserve minimum salary or senior minimum salary depending on where they fall on the supplemental roster ● Clubs may use up to $200,000 of TAM or GAM to sign a new Homegrown player to their first MLS contract, this subject to league approval ● A club can’t use TAM on a homegrown player previously signed to MLS Important Dates from 2024 (may be slightly different in 2025) ● In 2024, February 23 by 8PM, was the set time at which clubs had to ensure their roster was compliant with MLS rules. This was known as the “Roster Compliance Date” and is scheduled right before the season opener ● In 2024, the “Roster Freeze Date” was September 13, time by which clubs had to submit their final 30 man roster which can’t change from this date until after the MLS cup, subject to extreme hardship ● In 2025, the roster compliance date is February 22 Roster Construction 1) 3 DPs Model ● Up to 3 DPs ● Up to 3 U22 Initiative players 2) U22 Initiative Player Model ● Up to 2 DPs ● Up to 4 U22 Initiative Players ● Up to an additional $2 Million of GAM, in 2024, clubs who opted for this model received $1 Million ● The GAM received as a result of the U22 model must be used on the same year of competition Designated Players “Trade”: refers to a transaction between MLS clubs. Does not apply if the player is leaving for a seperate league ● This rule allows a club to acquire up to 3 players whose compensation and acquisition costs exceed the Maximum Salary Budget Charge ($683,750) ● Example) Lionel Messi, Inter Miami ● The club bears financial responsibility for the amount of compensation above player’s salary charge ● If the player joins the club after the opening of the secondary transfer window, the budget charge will be $341,875 ● Clubs can buy down the budget charge of a DP using GAM. Reduced amount can’t amount to less than $150,000 ● Only one DP can be traded per year and is only able to be traded after beginning his 2nd MLS season ● Upon trading the DP, the original club may still be responsible for certain financial obligations. A club can only be in such situation, also known as an ‘active trade’, with a maximum of 2 players at a time ● If DP is aged 21-23 during competition year the budget charge is $200,000 ● If DP is aged 20 or younger OR is register after secondary transfer window the charge is $150,000 ● Every club that adds a third DP to the roster has to pay a $150,000 charge to the league which is in turn split among clubs with 2 or less occupied DP slots as GAM in the following MLS season ● if the 3rd DP slot is used on a young DP (aged 23 or less), there is no charge U 22 Initiative Players ● Allows clubs to sign young players to lucrative contracts at a reduced budget charge ● Aged 20 or younger charge: $150,000 ● Aged 21-25 charge: $200,000 ● The salary of these players can’t exceed the Maximum Senior Budget Charge ● A player that signs this contract aged 22 or younger can hold U22 slot through the year in which he turns 25 ● Additionally, clubs don’t have a limit on acquisition fees for these players ● If a U22 Initiative Slot is transferred outside of the league, 95% of proceeds are paid to the club and certain amount can be converted to GAM based on the scale in the following slide (Increases by 5% annually thereafter) Domestic players & international roster spots ● US Clubs: a domestic player is a US citizen, Green Card Holder, Homegrown International rule player, or a refugee ● Canada Clubs: a domestic player is a Canadian Citizen, refugee, Homegrown International Rule Player, or US domestic player ● Canadian clubs must have at least 3 Canadian Domestic players on the roster at all times ● Additionally, Canadian clubs can designate up to 3 international players who have been under contract with MLS and a Canadian club for at least one year to not count towards an international slot ● International Slots: in 2024, there were 233 International slots divided among the 29 clubs (likely to increase with addition of San Diego FC). These slots are tradable and there is no limit on the amount of international slots on a team’s roster Homegrown players ● No limit on the number of HG players a club can sign in a given year ● Player must have been part of the club’s youth academy for at least one year ● Can be part of the senior or supplemental roster ● If in supplemental roster, a HG can earn up to $125,000 above reserve minimum salary (slots 25-30), or senior minimum salary (spots 21-24) ● Clubs can use up to $200,000 of their GAM or TAM to sign new HG players, subject to league approval Loans ● Each club is allowed to loan up to 2 players to another MLS club ● A field player must be 24 years or younger during league year to be eligible for a loan ● A goalkeeper must be 28 years or younger during league year to be eligible for a loan ● Loans must be initiated during primary or secondary transfer window ● A player can be loaned to a NON-MLS club. Unless specified in loan agreement, club will receive roster relief but not salary budget relief MLS Next Pro Loan (1 per year) ● This could prove a good solution to open up roster spot General Allocation Money ● As of December 10, team’s GAMs where this ● Can be acquired through: Trade with another MLS club, Qualifying for CONCACAF Champions Cup, Failure to qualify for the MLS playoffs, redistribution by league because of DP charge/ transfer fee ● An additional $2 Million can be acquired if clubs choose to opt for the U22 Initiative Player Model Roster Build ● Targeted Allocation Money ● MLS is phasing this out. Soon will only be GAM ● Can’t be traded ● Used to but down salaries"

MLS_ROSTER_URL = "https://stats-api.mlssoccer.com/players/seasons/MLS-SEA-0001KA/clubs/{}?per_page=100"
MLS_CLUBS_BY_IDS_URL = "https://sportapi.mlssoccer.com/api/clubs/bySportecIds/{}"

# initialize flask app
app = Flask(__name__)

# Enable CORS only for specific domains (React app running on localhost:3000)
# this lets you send requests to your own computer from your own computer i guess
# CORS(app, resources={r"/google": {"origins": "https://mlspal.vercel.app/"}})
CORS(app)
# # init database and populate with sample data
# db = SimpleVectorDatabase()
# # sample weather data
# WEATHER_DATA = SAMPLE_DATA
# embeddings = embed_many_texts(WEATHER_DATA)
# # add each document and its vector embedding to the db to enable rag
# for i in range(embeddings.shape[0]):
#     db.add_vector(embeddings[i], WEATHER_DATA[i])

# # here's some shitty state to handle conversation history
# users = []
# models = {}


@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Gagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return jsonify(response_body)

MLS_GOALS_URL = "https://sportapi.mlssoccer.com/api/stats/players/competition/MLS-COM-000001/season/MLS-SEA-0001KA/order/goals/desc?pageSize=100&page={}"

def get_db():
    return psycopg2.connect(os.environ.get("DATABASE_URL"))

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS player_stats (
            player_id TEXT PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            team TEXT,
            goals INTEGER,
            assists INTEGER,
            shots INTEGER,
            games_started INTEGER,
            fetched_at TIMESTAMP DEFAULT NOW()
        )
    """)
    conn.commit()
    cur.close()
    conn.close()


def init_roster_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS player_roster (
            player_id TEXT PRIMARY KEY,
            shirt_number TEXT,
            position TEXT,
            birth_date DATE,
            nationality TEXT
        )
    """)
    conn.commit()
    cur.close()
    conn.close()


def migrate_db():
    conn = get_db()
    cur = conn.cursor()
    # Add minutes to player_stats if not already there
    cur.execute("""
        ALTER TABLE player_stats
        ADD COLUMN IF NOT EXISTS minutes INTEGER
    """)
    # Remove legacy age column from player_roster if it exists
    cur.execute("""
        ALTER TABLE player_roster
        DROP COLUMN IF EXISTS age
    """)
    conn.commit()
    cur.close()
    conn.close()


init_db()
init_roster_db()
migrate_db()



@app.route('/stats/goals', methods=['GET'])
def get_goals_leaders():
    all_players = []
    page = 1
    while True:
        response = requests.get(MLS_GOALS_URL.format(page))
        batch = response.json()
        if not batch:
            break
        all_players.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    conn = get_db()
    cur = conn.cursor()
    for p in all_players:
        cur.execute("""
            INSERT INTO player_stats (player_id, first_name, last_name, team, goals, assists, shots, games_started, minutes, fetched_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
            ON CONFLICT (player_id) DO UPDATE SET
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                team = EXCLUDED.team,
                goals = EXCLUDED.goals,
                assists = EXCLUDED.assists,
                shots = EXCLUDED.shots,
                games_started = EXCLUDED.games_started,
                minutes = EXCLUDED.minutes,
                fetched_at = NOW()
        """, (
            p.get("player_id"),
            p.get("player_first_name"),
            p.get("player_last_name"),
            p.get("team_short_name"),
            p.get("goals"),
            p.get("assists"),
            p.get("shots_at_goal_sum"),
            p.get("game_started"),
            p.get("normalized_player_minutes")
        ))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(all_players)

@app.route('/stats/roster', methods=['GET'])
def get_roster():
    club_ids = [
        'MLS-CLU-000001', 'MLS-CLU-000002', 'MLS-CLU-000003', 'MLS-CLU-000004',
        'MLS-CLU-000005', 'MLS-CLU-000006', 'MLS-CLU-000007', 'MLS-CLU-000008',
        'MLS-CLU-000009', 'MLS-CLU-00000A', 'MLS-CLU-00000B', 'MLS-CLU-00000C',
        'MLS-CLU-00000D', 'MLS-CLU-00000E', 'MLS-CLU-00000F', 'MLS-CLU-00000G',
        'MLS-CLU-00000H', 'MLS-CLU-00000I', 'MLS-CLU-00000J', 'MLS-CLU-00000K',
        'MLS-CLU-00000L', 'MLS-CLU-00000M', 'MLS-CLU-00000N', 'MLS-CLU-00000O',
        'MLS-CLU-00000P', 'MLS-CLU-00000Q', 'MLS-CLU-00000R', 'MLS-CLU-00000S',
        'MLS-CLU-000065', 'MLS-CLU-00001L',
    ]
    
    ids_param = ",".join(club_ids)
    clubs_response = requests.get(MLS_CLUBS_BY_IDS_URL.format(ids_param))
    clubs = clubs_response.json()
    conn = get_db()
    cur = conn.cursor()
    
    for club in clubs:
        club_id = club['sportecId']
        roster_response = requests.get(MLS_ROSTER_URL.format(club_id))
        # if not roster_response.ok or not roster_response.text.strip():
        #     continue
        try:
            players = roster_response.json()['players']
        except Exception:
            print('no players in ', club)
            continue

        print(f"Fetching club {club_id}...")

        for p in players:
            cur.execute("""
                INSERT INTO player_roster (player_id, shirt_number, position, birth_date, nationality)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (player_id) DO UPDATE SET
                    shirt_number = EXCLUDED.shirt_number,
                    position = EXCLUDED.position,
                    birth_date = EXCLUDED.birth_date,
                    nationality = EXCLUDED.nationality
            """, (
                p.get("player_id"),       # verify field name from API response
                p.get("shirt_number"),    # verify field name
                p.get("playing_position_english"),      
                p.get("birth_date"),      # e.g. "1995-03-22"
                p.get("nationality_english"),     # verify field name
            ))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"status": "ok"})


@app.route('/players', methods=['GET'])
def get_players():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT
            s.player_id, s.first_name, s.last_name, s.team,
            s.goals, s.assists, s.shots, s.games_started, s.minutes,
            r.shirt_number, r.position,
            DATE_PART('year', AGE(r.birth_date)) AS age,
            r.nationality
        FROM player_stats s
        LEFT JOIN player_roster r ON s.player_id = r.player_id
        ORDER BY s.goals DESC
    """)
    rows = cur.fetchall()
    print(len(rows), ' players')
    cur.close()
    conn.close()
    players = [
        {
            "player_id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "team": row[3],
            "goals": row[4],
            "assists": row[5],
            "shots": row[6],
            "games_started": row[7],
            "minutes": row[8],
            "shirt_number": row[9],
            "position": row[10],
            "age": row[11],
            "nationality": row[12],
        }
        for row in rows
    ]
    return jsonify(players)


if __name__ == "__main__":
    app.run(debug=True, port=8080)  # Use debug=True for better error messages during development

