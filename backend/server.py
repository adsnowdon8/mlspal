import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from .model.Model import Model
from .model.vectordb import SimpleVectorDatabase
from .model.textEmbeddingUtils import embed_many_texts
from .model.weatherDataUtils import SAMPLE_DATA

import google.generativeai as genai
import os


# google api setup
GOOGLE_API_KEY = 'AIzaSyDUeg6mscDj7k-V-GQtOPWvC05u7oObr9k'
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

response = model.generate_content("What is the future of AI in one sentence?")
print(response.text)
print(response.prompt_feedback)
print(response.candidates)


# initialize flask app
api = Flask(__name__)

# Enable CORS only for specific domains (React app running on localhost:3000)
# this lets you send requests to your own computer from your own computer i guess
CORS(api, resources={r"/google": {"origins": "http://localhost:3000"},
                     r"/local": {"origins": "http://localhost:3000"}})

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


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Gagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return jsonify(response_body)

@api.route('/google', methods=['GET', 'POST'])
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
            print(pmessage)
            response = model.generate_content(pmessage)
            print(response.text)
            return jsonify(response.text)
        except (json.JSONDecodeError, KeyError) as e:
            return jsonify({"error": str(e)}), 400  # Return an error message in JSON format

@api.route('/local', methods=['GET', 'POST'])
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
        

def handle_query():
    question = request.json['question']
    context_chunks = pinecone_service.get_most_similar_chunks_for_query(question, PINECONE_INDEX_NAME)
    prompt = build_prompt(question, context_chunks)
    print("\n==== PROMPT ====\n")
    print(prompt)
    answer = openai_service.get_llm_answer(prompt)
    return jsonify({ "question": question, "answer": answer })  

if __name__ == "__main__":
    api.run(debug=True, port=5000)  # Use debug=True for better error messages during development
