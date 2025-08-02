from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

# Add CORS headers manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/predict')
def predict():
    json_path = os.path.join(os.path.dirname(__file__), 'predicted_aqi.json')
    if not os.path.exists(json_path):
        return jsonify({'error': 'Prediction file not found'}), 404
    with open(json_path) as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5001)