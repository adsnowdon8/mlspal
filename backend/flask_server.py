import json
import os
import psycopg2
import requests
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from consts import MLS_TRADE_RULES, document_prefix_promt



# google api setup
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel('gemini-pro')
# model= genai.GenerativeModel('models/gemini-1.5-pro-001')
model= genai.GenerativeModel('models/gemini-2.0-flash-lite')
# gemini pro?

# print("-------")
# list =genai.list_models()
# print([x for x in list])
# print("-------")
# for i, m in zip(range(5), genai.list_models()):
#     print(f"Name: {m.name} Description: {m.description} support: {m.supported_generation_methods}")


MLS_TRADE_RULES =   "Major League Soccer Rule Breakdown Salary Budget Information (2024) ● Salary budget per club: $5,470,000 ● Maximum allowed budget charge: $683,750 ● Senior (roster spot 1-24) minimum salary: $89,716 ● Reserve (roster spot 25-30) minimum salary: $71,401 ● Designated player budget charge: $683,750 ● 2nd designated player budget charges: $683,750 ● 3rd designated player budget charge: $683,750 ● Young (20 years or younger during league year) designated player budget charge: $150,000 ● Young (21-23 years old during league year) designated player budget charge: $200,000 ● Mid-season designated player budget salary charge: $341,875 ● Mid-season young (23 years of age or younger during league year) designated player budget charge : $341,875 ● Maximum targeted allocation money (TAM) amount: $1,683,750 ● u22 initiative slot budget charge (20 years or younger during league year): $150,000 ● u22 initiative slot budget charge (21-25 years old during league year): $200,000 2025 Roster ● Salary Budget Cap 2025 : $5,950,000 ● Senior Maximum Budget Charge 2025 (DP Cap Hit) : $743,750 ● As opposed to last year, every team’s GAM is public this year The Senior Roster ● Roster slots 1-20 ● Salaries count against $5,470,000 salary budget ● A club can have as little as 18 players on the senior roster, each unfilled slot under 18 will incur a minimum salary budget charge ($89,716) against the salary budget ● If a player on the senior roster is place on the injury list, the club may receive an additional roster spot but will not receive salary relief (must pay salary and it still counts towards total budget) ● If injured player is an international, additional roster spot can be an international slot ● The maximum allowed budget charge for a single player is $683,750 ● the total charge of a designated player’s salary to the budget can be bought down using GAM, this reduction may NOT be less than $150,000 ● GAM can also be used to buy down non-dp player salaries, reducing up to 50% of the original amount(no more than 50%). However, a reduced salary using GAM can’t fall below $150,000. (example: a $200,000 salary can only be reduced by $50,000 of GAM as anything more would mean a fall below the minimum allowed bought down charge using GAM of $150,000) ● If a player’s bonuses put him above the maximum charge by year end, club must use allocation money to cover additional costs The Supplemental Roster ● Roster slots 21-30 ● Subject to injuries and loans, club can’t have more than 10 players on supplemental roster ● Salaries do not count against salary budget ● All Generation Adidas players are part of this roster during the initial guaranteed term of their contract (3 years) ; guaranteed spot as a reserve player for any team that selects him for 3 years ● Slots 21-24: Players earning at least senior minimum salary ($89,716); players in these spots may include Homegrown players, GA players, drafted players, or Homegrown players earning above senior minimum salary subject to Homegrown Player Subsidy (earning $125,000 above reserve or senior minimum salary) ● Slots 25-30: players earning reserve minimum salary ($71,401), can include homegrown players, homegrown players earning above reserve minimum subject to homegrown player subsidy, GA players earning reserve minimum salary ● Players in slots 25-30, must be 24 years or younger during the league year Homegrown Player Subsidy ● Homegrown players that form part of the supplemental roster (slots 21-30) can earn up to $125,000 above the reserve minimum salary or senior minimum salary depending on where they fall on the supplemental roster ● Clubs may use up to $200,000 of TAM or GAM to sign a new Homegrown player to their first MLS contract, this subject to league approval ● A club can’t use TAM on a homegrown player previously signed to MLS Important Dates from 2024 (may be slightly different in 2025) ● In 2024, February 23 by 8PM, was the set time at which clubs had to ensure their roster was compliant with MLS rules. This was known as the “Roster Compliance Date” and is scheduled right before the season opener ● In 2024, the “Roster Freeze Date” was September 13, time by which clubs had to submit their final 30 man roster which can’t change from this date until after the MLS cup, subject to extreme hardship ● In 2025, the roster compliance date is February 22 Roster Construction 1) 3 DPs Model ● Up to 3 DPs ● Up to 3 U22 Initiative players 2) U22 Initiative Player Model ● Up to 2 DPs ● Up to 4 U22 Initiative Players ● Up to an additional $2 Million of GAM, in 2024, clubs who opted for this model received $1 Million ● The GAM received as a result of the U22 model must be used on the same year of competition Designated Players “Trade”: refers to a transaction between MLS clubs. Does not apply if the player is leaving for a seperate league ● This rule allows a club to acquire up to 3 players whose compensation and acquisition costs exceed the Maximum Salary Budget Charge ($683,750) ● Example) Lionel Messi, Inter Miami ● The club bears financial responsibility for the amount of compensation above player’s salary charge ● If the player joins the club after the opening of the secondary transfer window, the budget charge will be $341,875 ● Clubs can buy down the budget charge of a DP using GAM. Reduced amount can’t amount to less than $150,000 ● Only one DP can be traded per year and is only able to be traded after beginning his 2nd MLS season ● Upon trading the DP, the original club may still be responsible for certain financial obligations. A club can only be in such situation, also known as an ‘active trade’, with a maximum of 2 players at a time ● If DP is aged 21-23 during competition year the budget charge is $200,000 ● If DP is aged 20 or younger OR is register after secondary transfer window the charge is $150,000 ● Every club that adds a third DP to the roster has to pay a $150,000 charge to the league which is in turn split among clubs with 2 or less occupied DP slots as GAM in the following MLS season ● if the 3rd DP slot is used on a young DP (aged 23 or less), there is no charge U 22 Initiative Players ● Allows clubs to sign young players to lucrative contracts at a reduced budget charge ● Aged 20 or younger charge: $150,000 ● Aged 21-25 charge: $200,000 ● The salary of these players can’t exceed the Maximum Senior Budget Charge ● A player that signs this contract aged 22 or younger can hold U22 slot through the year in which he turns 25 ● Additionally, clubs don’t have a limit on acquisition fees for these players ● If a U22 Initiative Slot is transferred outside of the league, 95% of proceeds are paid to the club and certain amount can be converted to GAM based on the scale in the following slide (Increases by 5% annually thereafter) Domestic players & international roster spots ● US Clubs: a domestic player is a US citizen, Green Card Holder, Homegrown International rule player, or a refugee ● Canada Clubs: a domestic player is a Canadian Citizen, refugee, Homegrown International Rule Player, or US domestic player ● Canadian clubs must have at least 3 Canadian Domestic players on the roster at all times ● Additionally, Canadian clubs can designate up to 3 international players who have been under contract with MLS and a Canadian club for at least one year to not count towards an international slot ● International Slots: in 2024, there were 233 International slots divided among the 29 clubs (likely to increase with addition of San Diego FC). These slots are tradable and there is no limit on the amount of international slots on a team’s roster Homegrown players ● No limit on the number of HG players a club can sign in a given year ● Player must have been part of the club’s youth academy for at least one year ● Can be part of the senior or supplemental roster ● If in supplemental roster, a HG can earn up to $125,000 above reserve minimum salary (slots 25-30), or senior minimum salary (spots 21-24) ● Clubs can use up to $200,000 of their GAM or TAM to sign new HG players, subject to league approval Loans ● Each club is allowed to loan up to 2 players to another MLS club ● A field player must be 24 years or younger during league year to be eligible for a loan ● A goalkeeper must be 28 years or younger during league year to be eligible for a loan ● Loans must be initiated during primary or secondary transfer window ● A player can be loaned to a NON-MLS club. Unless specified in loan agreement, club will receive roster relief but not salary budget relief MLS Next Pro Loan (1 per year) ● This could prove a good solution to open up roster spot General Allocation Money ● As of December 10, team’s GAMs where this ● Can be acquired through: Trade with another MLS club, Qualifying for CONCACAF Champions Cup, Failure to qualify for the MLS playoffs, redistribution by league because of DP charge/ transfer fee ● An additional $2 Million can be acquired if clubs choose to opt for the U22 Initiative Player Model Roster Build ● Targeted Allocation Money ● MLS is phasing this out. Soon will only be GAM ● Can’t be traded ● Used to but down salaries"


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

@app.route('/google', methods=['GET', 'POST'])
def gemini_response():
    if request.method == 'GET':
        print('---------------- in server GET')
        response = model.generate_content("What is the meaning of life?")
        return jsonify(response.text)

    if request.method == 'POST':
        print('---------------- in server POST')
        try:
            deserializedData = json.loads(request.data)
            pmessage = deserializedData['question']
            playerInfo = deserializedData['playerInfo']
            pmessage2 = deserializedData['playerCurrentClubInfo']
            proposedTeamInfo = deserializedData['proposedTeamInfo']
            # print(pmessage1,pmessage2, pmessage3)

            context = document_prefix_promt +  'player information: "' + json.dumps(playerInfo) +'" current team information: "' +json.dumps(pmessage2) + '" proposed team information: "' +proposedTeamInfo + MLS_TRADE_RULES + "."
            

            sendString =context + " Proposed trade: " + pmessage + "\n\n"
            print("sendString:",sendString)


            response = model.generate_content(pmessage)

            print(response.text)
            jsonResponse =  jsonify(response.text)
            jsonResponse.headers.add('Access-Control-Allow-Origin', '*')
            return jsonResponse
        except (json.JSONDecodeError, KeyError) as e:
            return jsonify({"error": str(e)}), 400  # Return an error message in JSON format

@app.route('/local', methods=['GET', 'POST'])
def local_response():
    if request.method == 'GET':
        return jsonify({"message": "GET request received."})  # Return a valid JSON response

    if request.method == 'POST':
        print("(!@#!@#!#@!# IN POST)")
        try:
            deserializedData = json.loads(request.data)
            print("deserializedData:",deserializedData)
            pmessage = deserializedData['question']
            user = deserializedData['username']
            print("user:",user)
            # if user not in users:
            #     users.append(user)
            #     models[user] = Model(db=db)
            # model = models[user]
            response = model.generate_with_context(pmessage)
            print(model.convo_history)
            return jsonify(response)  # Wrap the response in a JSON object
        except (json.JSONDecodeError, KeyError) as e:
            return jsonify({"error": str(e)}), 400  # Return an error message in JSON format


MLS_GOALS_URL = "https://sportapi.mlssoccer.com/api/stats/players/competition/MLS-COM-000001/season/MLS-SEA-0001KA/order/goals/desc?pageSize=30&page=1"

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

init_db()

@app.route('/stats/goals', methods=['GET'])
def get_goals_leaders():
    response = requests.get(MLS_GOALS_URL)
    players = response.json()

    conn = get_db()
    cur = conn.cursor()
    for p in players:
        cur.execute("""
            INSERT INTO player_stats (player_id, first_name, last_name, team, goals, assists, shots, games_started, fetched_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
            ON CONFLICT (player_id) DO UPDATE SET
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                team = EXCLUDED.team,
                goals = EXCLUDED.goals,
                assists = EXCLUDED.assists,
                shots = EXCLUDED.shots,
                games_started = EXCLUDED.games_started,
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
        ))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify(players)


# if __name__ == "__main__":
#     api.run(debug=True, port=5000)  # Use debug=True for better error messages during development

