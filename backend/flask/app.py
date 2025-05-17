from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from core.router import QueryRouter
import io

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'data', 'uploaded')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'csv'}

router = QueryRouter()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

@app.route('/preview', methods=['POST'])
def preview_csv():
    data = request.get_json()
    filename = data.get('filename')
    rows = data.get('rows', 5)
    
    if not filename:
        return jsonify({'error': 'Filename is required'}), 400
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    try:
        preview_data = router.get_preview(file_path, rows)
        return jsonify(preview_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    filename = data.get('filename')
    question = data.get('question')
    
    if not filename or not question:
        return jsonify({'error': 'Filename and question are required'}), 400
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    try:
        response_text = router.route_query(file_path, question)

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"CSV file not found at: {file_path}")
        
        file_stream = io.BytesIO()
        with open(file_path, 'rb') as f:
            file_stream.write(f.read())
        file_stream.seek(0)

        response = send_file(
            file_stream,
            mimetype='text/csv',
            as_attachment=True,
            download_name=filename,
            etag=True,
            conditional=True
        )
        response.headers['X-Query-Response'] = response_text
        return response

    except Exception as e:
        app.logger.error(f"Query failed: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)