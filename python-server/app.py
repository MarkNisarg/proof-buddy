from flask import Flask, jsonify, request
from flask_cors import CORS
from ProofEngine import ProofEngine

# This file will accept all communication with the frontend and send any action requests to a ProofEngine
# object to perform and send a reply back. Currently it will need to call create_ProofEngine from the
# 'language' definition file EquationalReasoning.py in order to instantiate an ERProofEngine that handles
# these requests. Eventually, a mechanism will need to be implemented to switch out engines for ones defined
# in other language definition files such as FirstOrderLogic.py and TruthFunctionalLogic.py that have yet to
# be written.


#Instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['JSON_SORT_KEYS'] = False
proofEngine = ProofEngine()

#Enable Cors
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/api/v1/proof/er-generate', methods=['GET'])
def  get_er_proof_data():
    return jsonify({'name': 'test'})

@app.route('/api/v1/proof/er-generate', methods=['POST'])
def get_repositories():
    with app.app_context():
        json_data = request.get_json()
        print(json_data)
        racket = proofEngine.generateRacketFromRule(json_data['rule'])
        return jsonify({"racket": racket}), 200

if __name__ == '__main__': 
    app.run(host='localhost', port=9095, debug=True)