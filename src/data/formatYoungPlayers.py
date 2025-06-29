
import csv
import datetime
import json
from datetime import date


def calculate_age(birthdate_str):
    if not birthdate_str: 
        return 0
    if birthdate_str == 'n/a':
        return -1
    
    print( birthdate_str)
    
    birthdate = datetime.datetime.strptime(birthdate_str, "%m/%d/%Y")
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age 


output = []

with open('YoungPlayers_6_25_25.csv','r') as file:

    csv_reader = csv.reader(file)
    # next(csv_reader)
    header = []
    header = next(csv_reader)

    # header  
    '''{
    Shirt_Number
    Name
    Minutes_Played
    Team
    Contract_End
    Option_Years
    Age
    Position
    Roster_Designation
    Nationality
    Domestic_or_International
      }'''
    

    print(header)
    for row in csv_reader:
        print(row)
        first_name, last_name, mins, team,DOB,age,position,nationality,foot= row[:9]
        curData = {
            # 'Shirt_Number': shirt_number,
            'Name': ' '.join(filter(None, [first_name.strip(), last_name.strip()])),
            'Minutes_Played': mins,
            'Team':team.strip(),
            'DOB':DOB,
            'Age': calculate_age(DOB),
            'Position': position,
            'Nationality':nationality,
            'Foot': foot
        }
        output.append(curData)

# with open('players.txt', 'w') as f:
#   for p in output:
#       f.write(str(p) + '\n')

with open("young_players_6_25_25.json", "w") as f:
    # Dump the data to the file in JSON format
    json.dump(output, f, indent=4)  # indent for pretty formatting

# def formatPlayers(players):
#     print(players)



