
import csv
import datetime
import json
from datetime import date


def calculate_age(birthdate_str):
    if not birthdate_str: 
        return 0
    
    birthdate = datetime.datetime.strptime(birthdate_str, "%m/%d/%Y")
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age 


output = []

with open('TeamInfoMLS-West_6_19_25.csv','r') as file:

    csv_reader = csv.reader(file)
    # next(csv_reader)
    header = []
    header = next(csv_reader)

    for row in csv_reader:
        curData = {
                   header[0].replace(" ", '_'): row[0],
                   header[1].replace(" ", '_'): row[1],
                   header[2].replace(" ", '_'): row[2],
                   header[3].replace(" ", '_'): row[3], # GM
                   header[4].replace(" ", '_'): row[4], # City
                   header[5].replace(" ", '_'): row[5], # Position End Last Season
                   header[6].replace(" ", '_'): row[6], # MLS Playoffs
                   header[7].replace(" ", '_'): row[7], # Number of Roster Slots Filled
                   header[8].replace(" ", '_'): row[8], # Roster Model
                #    header[9].replace(" ", '_'): row[9]  # International Slots Filled
                    } 
        output.append(curData)

# with open('players.txt', 'w') as f:
#   for p in output:
#       f.write(str(p) + '\n')

with open("WestTeams_6_19_25.json", "w") as f:
    # Dump the data to the file in JSON format
    json.dump(output, f, indent=4)  # indent for pretty formatting

# def formatPlayers(players):
#     print(players)



