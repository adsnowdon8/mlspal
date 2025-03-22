
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

with open('playerInfoV2.csv','r') as file:

    csv_reader = csv.reader(file)
    # next(csv_reader)
    header = []
    header = next(csv_reader)
    print(header)
    for row in csv_reader:
        curData = {header[0].replace(" ", '_'): row[0], # first name
                   header[1].replace(" ", '_'): row[1], # last name
                   header[2].replace(" ", '_'): row[2], # contrct end
                   header[3].replace(" ", '_'): row[3], # option years
                   header[4].replace(" ", '_'): row[4], # team
                   header[5].replace(" ", '_'): calculate_age(row[5]), # age
                   header[6].replace(" ", '_'): row[6], # position
                    header[7].replace(" ", '_'): row[7], # Roster Designation
                    header[8].replace(" ", '_'): row[8], # Nationality
                    header[9].replace(" ", '_'): row[9], # Domestic or International
                    header[10].replace(" ", '_'): row[10], # Minutes Played
             }
        output.append(curData)

# with open('players.txt', 'w') as f:
#   for p in output:
#       f.write(str(p) + '\n')

with open("players.json", "w") as f:
    # Dump the data to the file in JSON format
    json.dump(output, f, indent=4)  # indent for pretty formatting

# def formatPlayers(players):
#     print(players)



