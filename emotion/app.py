from flask import Flask, jsonify, session, request, redirect, flash, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import emotion

ALLOWED_EXTENSIONS = {'webm'}

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'upload'

@app.route('/emotion', methods=['POST'])
def emotion():
    file = request.files['video']
    if file.filename == '':
        return jsonify({"success": False}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

    return jsonify(emotion.gen(filepath))

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

