# app.py
from flask import Flask, request, jsonify, Blueprint, render_template
from authlib.integrations.flask_client import OAuth
from main_routes import create_main_blueprint
from flask_cors import CORS


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
app.secret_key = appConf.get("FLASK_SECRET")

oauth = OAuth(app)
oauth.register(
    name="AI_Interviewer",
    client_id=appConf.get("OAUTH2_CLIENT_ID"),
    client_secret=appConf.get("OAUTH2_CLIENT_SECRET"),
    server_metadata_url=appConf.get("OAUTH2_META_URL"),
    client_kwargs={"scope": "openid profile email"},
)

# Register the Blueprint with the 'oauth' object passed as an argument
main_blueprint = create_main_blueprint(oauth)
CORS(main_blueprint, resources={r"/*": {"origins": "http://localhost:3000"}})
app.register_blueprint(main_blueprint)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

