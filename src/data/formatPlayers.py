
import csv
import datetime
import json
from datetime import date


def calculate_age(birthdate_str):
    if not birthdate_str: 
        return 0
    
    print( birthdate_str)
    
    birthdate = datetime.datetime.strptime(birthdate_str, "%m/%d/%Y")
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age 


output = []

with open('players_6_19_25.csv','r') as file:

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
        shirt_number,first_name, last_name, mins, team,roster_des, contract_end, option_years, age, position,nationality, domestic =row[:12]
        curData = {
            'Shirt_Number': shirt_number,
            'Name': ' '.join(filter(None, [first_name.strip(), last_name.strip()])),
            'Minutes_Played': mins,
            'Team':team.strip(),
            'Contract_End':contract_end,
            'Option_Years': option_years,
            'Age': calculate_age(age),
            'Position': position,
            'Roster_Designation':roster_des,
            'Nationality':nationality,
            'Domestic_or_International': domestic
        }
        # curData = {
        #     header[0].replace(" ", '_'): row[0].strip(), # first name
        #            header[1].replace(" ", '_'): row[1].strip(), # last name
        #             header[2].replace(" ", '_'): row[2], # Minutes Played
        #            header[3].replace(" ", '_'): row[3], # team
        #            header[4].replace(" ", '_'): row[4], # contrct end
        #            header[5].replace(" ", '_'): row[5], # option years
        #            header[6].replace(" ", '_'): calculate_age(row[6]), # age
        #            header[7].replace(" ", '_'): row[7], # position
        #             header[8].replace(" ", '_'): row[8], # Roster Designation
        #             header[9].replace(" ", '_'): row[9], # Nationality
        #             header[10].replace(" ", '_'): row[10], # Domestic or International
        #      }
        output.append(curData)

# with open('players.txt', 'w') as f:
#   for p in output:
#       f.write(str(p) + '\n')

with open("players_6_19_25.json", "w") as f:
    # Dump the data to the file in JSON format
    json.dump(output, f, indent=4)  # indent for pretty formatting

# def formatPlayers(players):
#     print(players)



