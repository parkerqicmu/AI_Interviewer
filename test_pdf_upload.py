from flask import Flask, render_template, request, redirect, url_for
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Define the folder where uploaded files will be stored
UPLOAD_FOLDER = 'pdf_uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Specify allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'txt', 'doc', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)

    file = request.files['file']

    if file.filename == '':
        return redirect(request.url)

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'File uploaded successfully.'

    return 'Invalid file format. Allowed formats are: ' + ', '.join(ALLOWED_EXTENSIONS)

if __name__ == '__main__':
    app.run(debug=True)
