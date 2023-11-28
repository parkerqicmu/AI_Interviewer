#main_routes.py
from flask import Blueprint, url_for, render_template, session, redirect, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests as google_auth_request
import requests

from pymongo import MongoClient
from gridfs import GridFS
import os
from werkzeug.utils import secure_filename

from gpt import generate_questions, follow_up_questions, generate_feedback

# MongoDB client setup
client = MongoClient('localhost', 27017)
db = client['user_database']
collection = db['user_profiles']
fs = GridFS(db)

live_session = {}
# Define the folder where uploaded files will be stored
UPLOAD_FOLDER = 'file_uploads'
ALLOWED_EXTENSIONS = {'pdf', 'txt', 'doc', 'docx'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def create_main_blueprint(oauth):
    main_blueprint = Blueprint("main", __name__)
    
    @main_blueprint.route("/signin_google", methods=['POST'])
    def handle_google_login():
        data = request.json
        token = data.get('token')
        CLIENT_ID = "1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com"
        try:
            idinfo = id_token.verify_oauth2_token(token, google_auth_request.Request(), CLIENT_ID)
            userid = idinfo['sub']
            live_session["user"] = {
                "token": token,
                'profile': data.get('profile'),
                'userid': userid,
            }
            session["user"] = {
                "token": token,
                'profile': data.get('profile'),
                'userid': userid,
            }
        except ValueError:
            return 'Invalid token', 400
        return 'Successfully signed in with Google!', 200

    @main_blueprint.route("/signout_google")
    def googleSignout():
        if "user" not in live_session:
            return 'You are currently not signed in.', 401
        requests.post('https://oauth2.googleapis.com/revoke',
            params={'token': session["user"]},
            headers={'content-type': 'application/x-www-form-urlencoded'}
        )
        live_session.pop("user", None)
        return 'Successfully signed out with Google!', 200

    @main_blueprint.route('/job_description', methods=['POST'])
    def add_job_description():
        data = request.get_json()  # get the request data in JSON format
        job_description = {
            'job_title': data.get('job_title'),
            'company_name': data.get('company_name'),
            'company_description': data.get('company_description'),
            'position_name': data.get('position_name'),
            'position_responsibility': data.get('position_responsibility'),
            'position_requirements': data.get('position_requirements'),
            'conversation_history': []
        }
        # Check if user is logged in and retrieve their userid

        if "user" in live_session and "userid" in live_session["user"]:
            userid = live_session['user']['userid']
            user_profile = collection.find_one({"userid": userid})
            if user_profile:
                # Add new job description to the array of existing job descriptions
                collection.update_one(
                    {"userid": userid},
                    {"$push": {"job_descriptions": job_description}}
                )
            else:
                # Create a new profile with an array for job descriptions
                new_profile = {"userid": userid, "job_descriptions": [job_description], "resume": None}
                collection.insert_one(new_profile)
            return jsonify({'message': 'Job description updated successfully'}), 200
        else:
            return jsonify({'message': 'User not logged in'}), 401
    
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @main_blueprint.route('/upload_file', methods=['POST'])
    def upload_file():
        if 'file' not in request.files:
            return jsonify({'message': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        if not allowed_file(file.filename):
            return jsonify({'message': 'File type not allowed'}), 400

        if "user" in session and "userid" in session["user"]:
            userid = session['user']['userid']
            user_profile = collection.find_one({"userid": userid})

            # Read file in a memory-efficient way
            file.seek(0, os.SEEK_END)
            file_length = file.tell()
            if file_length > MAX_FILE_SIZE:
                return jsonify({'message': 'File too large'}), 400
            file.seek(0)  # Reset file pointer to the start

            if user_profile:
                filename = secure_filename(file.filename)
                # Save the file content in GridFS or other storage here
                # For example, let's assume you have a function save_file_to_storage(file)
                file_id = fs.put(file, filename=file.filename)
                collection.update_one(
                    {"userid": userid},
                    {"$set": {"resume": file_id}}
                )
                return jsonify({'message': 'Resume updated successfully'}), 200
            else:
                return jsonify({'message': 'User profile not found'}), 404
        else:
            return jsonify({'message': 'User not logged in'}), 401
    
    # generate questions from GPT
    # input: question type & difficulty
    @main_blueprint.route('/get_questions', methods=['POST'])
    def get_questions():
        data = request.get_json()
        history = []
        number_of_questions = data.get('number_of_questions')
        company_name = data.get('company_name')
        company_description = data.get('company_description')
        position_name = data.get('position_name')
        position_responsibility = data.get('position_responsibility')
        position_requirements = data.get('position_requirements')
        user_experience = data.get('user_experience')
        question_type = data.get('question_type')
        difficulty = data.get('difficulty')
    
        questions = generate_questions(history, number_of_questions, company_name, company_description, position_name, position_responsibility, position_requirements, user_experience, question_type, difficulty)
        return jsonify({'questions': questions}), 200
    
    # generate feedback from GPT
    # input: answer to the question
    @main_blueprint.route('/generate_feedback', methods=['POST'])
    def get_feedback():
        data = request.get_json()
        answer = data.get('answer')

        # Check if user is logged in and retrieve their userid
        if "user" in session and "userid" in session["user"]:
            userid = session['user']['userid']
            user_profile = collection.find_one({"userid": userid})
            if user_profile:
                # get job description
                job_descriptions = user_profile[-1]['job_descriptions']
                history = job_descriptions.get('conversation_history')
                company_name = job_descriptions.get('company_name')
                position_name = job_descriptions.get('position_name')
            else:
                return jsonify({'message': 'Unexpected Error'}), 401
        else:
            return jsonify({'message': 'User not logged in'}), 401
        
        feedback = generate_feedback(history, answer, company_name, position_name)
        return jsonify({'feedback': feedback}), 200

    return main_blueprint

