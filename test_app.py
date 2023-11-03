from flask import Flask, url_for, session, redirect
from authlib.integrations.flask_client import OAuth
import json

app = Flask(__name__)

# Open the "secret-api-key.txt" file and read the API keys
with open("secret-api-key.txt", "r") as file:
    lines = file.readlines()
    google_oauth_client_secret = None
    flask_secret = None
    
    google_oauth_index = lines.index("Google_OAuth_Client_Secret\n")
    flask_secret_index = lines.index("Flask_Secret\n")
    
    google_oauth_client_secret = lines[google_oauth_index + 1].strip()
    flask_secret = lines[flask_secret_index + 1].strip()

appConf = {
	"OAUTH2_CLIENT_ID": "1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com",
	"OAUTH2_CLIENT_SECRET": google_oauth_client_secret,
	"OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
	"FLASK_SECRET": flask_secret
}

oauth = OAuth(app)

app.secret_key = appConf.get("FLASK_SECRET")

oauth.register("AI_Interviewer", 
				client_id = appConf.get("OAUTH2_CLIENT_ID"),
				client_secret = appConf.get("OAUTH2_CLIENT_SECRET"),
				server_metadata_url = appConf.get("OAUTH2_META_URL"),
				client_kwargs = {
					"scope": "openid profile email"
				}
				)

@app.route('/')
def home():
	return 'Hello World AI Interviewer!'

@app.route("/google_login")
def googleLogin():
	return oauth.AI_Interviewer.authorize_redirect(redirect_uri=url_for("googleCallback", _external=True))

@app.route("/signin_google")
def googleCallback():
	token = oauth.AI_Interviewer.authorize_access_token()
	session["user"] = token
	return redirect(url_for("home"))

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)