#main_routes.py
from flask import Blueprint, url_for, render_template, session, redirect
from authlib.integrations.flask_client import OAuth
import requests
import google.oauth2.credentials


def create_main_blueprint(oauth):
    main_blueprint = Blueprint("main", __name__)

    @main_blueprint.route('/')
    def home():
        if "user" in session:
            return 'Hello World AI Interviewer! You are currently signed in.'
        else:
            return 'Hello World AI Interviewer! You are currently not signed in.'

    @main_blueprint.route("/google_login")
    def googleLogin():
        return oauth.AI_Interviewer.authorize_redirect(redirect_uri=url_for("main.googleCallback", _external=True))

    @main_blueprint.route("/signin_google")
    def googleCallback():
        token = oauth.AI_Interviewer.authorize_access_token()
        session["user"] = token
        return redirect(url_for("main.home"))

    @main_blueprint.route("/signout_google")
    def googleSignout():
        requests.post('https://oauth2.googleapis.com/revoke',
            params={'token': session["user"]},
            headers={'content-type': 'application/x-www-form-urlencoded'}
        )
        session.pop("user", None)
        return redirect(url_for("main.home"))

    return main_blueprint
