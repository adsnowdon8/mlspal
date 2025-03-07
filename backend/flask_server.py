import json
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS



# google api setup
GOOGLE_API_KEY = 'AIzaSyDUeg6mscDj7k-V-GQtOPWvC05u7oObr9k'
genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel('gemini-pro')
# model= genai.GenerativeModel('models/gemini-1.5-pro-001')
model= genai.GenerativeModel('models/gemini-2.0-flash-lite')
# gemini pro?

print("-------")
list =genai.list_models()
print([x for x in list])
print("-------")
for i, m in zip(range(5), genai.list_models()):
    print(f"Name: {m.name} Description: {m.description} support: {m.supported_generation_methods}")




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
            pmessage1 = deserializedData['playerInfo']
            pmessage2 = deserializedData['playerCurrentClubInfo']
            pmessage3 = deserializedData['proposedTeamInfo']
            print(pmessage1,pmessage2, pmessage3)
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


# if __name__ == "__main__":
#     api.run(debug=True, port=5000)  # Use debug=True for better error messages during development

