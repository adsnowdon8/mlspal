
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

with open('playerTable5_20.csv','r') as file:

    csv_reader = csv.reader(file)
    # next(csv_reader)
    header = []
    header = next(csv_reader)
    print(header)
    for row in csv_reader:
        print(row)
        curData = {header[0].replace(" ", '_'): row[0].strip(), # first name
                   header[1].replace(" ", '_'): row[1].strip(), # last name
                    header[2].replace(" ", '_'): row[2], # Minutes Played
                   header[3].replace(" ", '_'): row[3], # team
                   header[4].replace(" ", '_'): row[4], # contrct end
                   header[5].replace(" ", '_'): row[5], # option years
                   header[6].replace(" ", '_'): calculate_age(row[6]), # age
                   header[7].replace(" ", '_'): row[7], # position
                    header[8].replace(" ", '_'): row[8], # Roster Designation
                    header[9].replace(" ", '_'): row[9], # Nationality
                    header[10].replace(" ", '_'): row[10], # Domestic or International
             }
        output.append(curData)

# with open('players.txt', 'w') as f:
#   for p in output:
#       f.write(str(p) + '\n')

with open("players2.json", "w") as f:
    # Dump the data to the file in JSON format
    json.dump(output, f, indent=4)  # indent for pretty formatting

# def formatPlayers(players):
#     print(players)



