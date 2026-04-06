


import requests

BASE_URL = "https://sportapi.mlssoccer.com/api/stats/players/competition/MLS-COM-000001/season/MLS-SEA-0001KA/order/goals/desc"

def get_all_mls_teams():
    page = 1
    page_size = 30
    teams = {}

    while True:
        url = f"{BASE_URL}?pageSize={page_size}&page={page}"
        print(f"Fetching page {page}...")

        res = requests.get(url)
        if res.status_code != 200:
            print("Error:", res.status_code)
            break

        data = res.json()
        
        players = data
        if not players:
            print("No more players. Stopping.")
            break

        for p in players:
            team_id = p.get("team_id")
            team_name = p.get("team_short_name")

            if team_id and team_name:
                teams[team_id] = team_name

        page += 1

    return teams

if __name__ == "__main__":
    teams = get_all_mls_teams()

    print("\n=== MLS Teams Found ===")
    for tid, name in sorted(teams.items()):
        print(f"{tid} → {name}")

    print(f"\nTotal teams: {len(teams.keys())}")