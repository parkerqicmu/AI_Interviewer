#main_routes.py
from flask import Blueprint, url_for, render_template, session, redirect, request, jsonify
from authlib.integrations.flask_client import OAuth
import requests
import google.oauth2.credentials
from pymongo import MongoClient

# MongoDB client setup
client = MongoClient('localhost', 27017)
db = client['user_database']
collection = db['user_profiles']

def create_main_blueprint(oauth):
    main_blueprint = Blueprint("main", __name__)

    @main_blueprint.route('/')
    def home():
        if "user" in session and "email" in session["user"]:
            email = session['user']['email']
            user_profile = collection.find_one({"email": email})

            if user_profile and 'job_descriptions' in user_profile and user_profile['job_descriptions']:
                # Get the latest job description
                latest_job_description = user_profile['job_descriptions'][-1]
                # Convert the job description to a string for display
                latest_job_desc_str = '\n'.join(f'{key}: {value}' for key, value in latest_job_description.items())
                return f'Hello World AI Interviewer! You are currently signed in. Your latest job description: \n{latest_job_desc_str}'
            else:
                return 'Hello World AI Interviewer! You are currently signed in, but no job descriptions found.'
        else:
            return 'Hello World AI Interviewer! You are currently not signed in.'

    @main_blueprint.route("/google_login")
    def googleLogin():
        return oauth.AI_Interviewer.authorize_redirect(redirect_uri=url_for("main.googleCallback", _external=True))

    @main_blueprint.route("/signin_google")
    def googleCallback():
        token = oauth.AI_Interviewer.authorize_access_token()
        # Fetch user info from Google
        userinfo_response = oauth.AI_Interviewer.get('https://www.googleapis.com/oauth2/v3/userinfo')
        if userinfo_response.status_code == 200:
            user_info = userinfo_response.json()
            # Store only necessary and serializable information in the session
            session["user"] = {
                "token": token,
                'email': user_info.get('email'),
                'name': user_info.get('name'),
                # any other user fields you need
            }
            return redirect(url_for("main.home"))
        else:
            return 'Failed to fetch user info', 500
        return redirect(url_for("main.home"))

    @main_blueprint.route("/signout_google")
    def googleSignout():
        requests.post('https://oauth2.googleapis.com/revoke',
            params={'token': session["user"]},
            headers={'content-type': 'application/x-www-form-urlencoded'}
        )
        session.pop("user", None)
        return redirect(url_for("main.home"))

    @main_blueprint.route('/job_description', methods=['PUT', 'GET'])
    def add_job_description():
        if request.method == 'PUT':
            data = request.get_json()  # get the request data in JSON format
            job_description = {
                'job_title': data.get('job_title'),
                'company_name': data.get('company_name'),
                'company_description': data.get('company_description'),
                'position_name': data.get('position_name'),
                'position_responsibility': data.get('position_responsibility'),
                'position_requirements': data.get('position_requirements')
            }

            # Check if user is logged in and retrieve their email
            if "user" in session and "email" in session["user"]:
                email = session['user']['email']
                user_profile = collection.find_one({"email": email})
                if user_profile:
                    # Add new job description to the array of existing job descriptions
                    collection.update_one(
                        {"email": email},
                        {"$push": {"job_descriptions": job_description}}
                    )
                else:
                    # Create a new profile with an array for job descriptions
                    new_profile = {"email": email, "job_descriptions": [job_description]}
                    collection.insert_one(new_profile)
                return jsonify({'message': 'Job description updated successfully'}), 200
            else:
                return jsonify({'message': 'User not logged in'}), 401

        elif request.method == 'GET':
            return render_template('job_description_form.html')
    
    return main_blueprint