from flask import Flask, jsonify, request
from flask_cors import CORS

#Instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['JSON_SORT_KEYS'] = False

#Enable Cors
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/api/v1/proof/er-generate', methods=['GET'])
def  get_er_proof_data():
    return jsonify({'name': 'test'})

@app.route('/api/v1/proof/er-generate', methods=['POST'])
def get_repositories():
    #repositories = proxy.get_repos()
    #python app.py
    #return jsonify({'name':"John", 'age':31, 'city':"New York"})
    with app.app_context():
        json_data = request.get_json()
        print(json_data)
        return jsonify({"received": True, "data": json_data}), 200

if __name__ == '__main__': 
    app.run(host='localhost', port=9095, debug=True)