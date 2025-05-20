import json
from flask import Flask, request, jsonify,send_from_directory
import google.generativeai as genai
from flask_cors import CORS
import time
import consts
import os

# google api setup
GOOGLE_API_KEY = 'AIzaSyDUeg6mscDj7k-V-GQtOPWvC05u7oObr9k'
genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel('gemini-pro')
# model= genai.GenerativeModel('models/gemini-1.5-pro-001')
# model= genai.GenerativeModel('models/gemini-2.0-flash-lite')
# model= genai.GenerativeModel('models/gemini-2.0-pro-exp-02-05')
model= genai.GenerativeModel('models/gemini-2.0-flash-lite')
# model= genai.GenerativeModel('models/gemini-1.5-pro')
model= genai.GenerativeModel('models/gemini-2.0-flash')


print("-------")
# list =genai.list_models()
# print([x for x in list])
# print("-------")
# for i, m in zip(range(5), genai.list_models()):
#     print(f"Name: {m.name} Description: {m.description} support: {m.supported_generation_methods}")




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
        start_time = time.perf_counter()


        try:
            deserializedData = json.loads(request.data)
            q = deserializedData['q']
            player = deserializedData['p']
            playerClub = deserializedData['pc']
            proposedClub = deserializedData['pt']
            shortOrLong = deserializedData['sol']

            context = consts.document_prefix_prompt +\
            player +\
            '" current team information: "' +\
            playerClub +\
            '" proposed team information: "' +\
            proposedClub + \
            consts.MLS_TRADE_RULES + "."

            sendString = context +" This is the trade we are proposing: " +  q
            if shortOrLong == 'short':
                sendString += " Give me a verdict and short response"

            print("testing send string", sendString)
            # print("pmessage", pmessage)
            start_time_inference = time.perf_counter()
            response = model.generate_content(sendString)
            end_time_inference = time.perf_counter()
            execution_time_inference = end_time_inference - start_time_inference
            print(f"Execution time inference: {execution_time_inference} seconds")
            print(response)
            jsonResponse =  jsonify(response.text)
            jsonResponse.headers.add('Access-Control-Allow-Origin', '*')

            end_time = time.perf_counter()
            execution_time = end_time - start_time
            print(f"Execution time: {execution_time} seconds")
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


###OUTFITTER####
DATA_FILE = 'store.json'
DATA_FILE= '/home/adsnowdon8/mysite/store.json'
# Load or create default data
def load_data():
    # if not os.path.exists(DATA_FILE):
    #     return {"B1": "", "B2": ""}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/get', methods=['GET'])
def get_strings():
    return jsonify(load_data())

@app.route('/set/<key>', methods=['POST'])
def set_string(key):
    if key not in ['B1', 'B2']:
        return {'error': 'Invalid key'}, 400
    value = request.json.get('value', '')
    data = load_data()
    data[key] = value
    save_data(data)
    return jsonify({'status': 'updated', key: value})


UPLOAD_FOLDER = '/home/adsnowdon8/mysite/uploads'
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']
    print('filename',file.filename)
    print('file', file.name)
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        return jsonify({'message': 'Image uploaded successfully', 'filename': file.filename}), 200

    return jsonify({'error': 'Unknown error'}), 500

@app.route('/upload2', methods=['POST'])
def upload_image2():
    # Check if the POST request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No image file in request'}), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    # Save using the filename provided by the client
    filepath = os.path.join(UPLOAD_FOLDER, image_file.filename)

    try:
        image_file.save(filepath)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({
        'message': 'Image uploaded successfully',
        'filename': image_file.filename,
        'path': filepath
    }), 200


@app.route('/get_files', methods=['GET'])
def list_files():
    try:
        filenames = os.listdir(UPLOAD_FOLDER)
        image_files = [f for f in filenames]
        return jsonify(image_files)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get-image/<filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/images', methods=['POST'])
def get_images():
    data = request.get_json()
    filenames = data.get('filenames', [])

    image_urls = []
    for fname in filenames:
        path = os.path.join(UPLOAD_FOLDER, fname)
        if os.path.isfile(path):
            url = f"https://yourdomain.com/uploads/{fname}"  # Change this to match your domain
            image_urls.append(url)

    return jsonify({'images': image_urls})
