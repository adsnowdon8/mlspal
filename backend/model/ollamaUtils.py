import requests

# Define the API endpoint (default is http://localhost:11434)
ollama_api_url = "http://localhost:11434/api/generate"

# upgrade your dumbass to llama3.2
def create_prompt_data(prompt, model='llama3.2', stream=False):
    # ive got it set up nicely for you Paarth
    data = {
    "model": model,
    "prompt": prompt,
    "stream": stream,
    }
    return data

def interact_with_model(prompt):
    """Send a prompt to the model and wait for the response."""
    url = ollama_api_url

    # Define the request payload
    data = create_prompt_data(prompt=prompt)

    try:
        # Send the request
        response = requests.post(url, json=data)

        # # Check if response is NDJSON or traditional JSON
        # if response.headers.get('Content-Type') == 'application/x-ndjson':
        #     results = []
        #     # Process NDJSON line by line
        #     for line in response.iter_lines():
        #         if line:
        #             results.append(json.loads(line.decode('utf-8')))
        #     return results  # Return the parsed NDJSON lines
        if response.headers.get('Content-Type').split(';')[0] == 'application/json':
            # If it's traditional JSON, return it directly
            return response.json()['response']

        else:
            # Handle unexpected content types
            return f"Unexpected response format: {response.headers.get('Content-Type')}\n{response.text}"

    except requests.exceptions.RequestException as e:
        return f"Request failed: {e}"
