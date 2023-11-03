from flask import Flask, url_for, session, redirect
from authlib.integrations.flask_client import OAuth
import json

app = Flask(__name__)

appConf = {
	"OAUTH2_CLIENT_ID": "1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com",
	"OAUTH2_CLIENT_SECRET": "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",
	"OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
	"FLASK_SECRET": "f0411eb4ccd70d6a86ca8db0"
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