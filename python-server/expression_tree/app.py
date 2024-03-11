from flask import Flask, jsonify, request
from flask_cors import CORS
import Decorator, ERobj, Labeler, recParser, test, typeFile
#Instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['JSON_SORT_KEYS'] = False
#proofEngine = ProofEngine()

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
        racket=""
        #racket = proofEngine.generateRacketFromRule(json_data['rule'])
        return jsonify({"racket": racket}), 200

@app.route('/api/v1/proof/check-goal', methods=['POST'])
def check_goal():
    with app.app_context():
        json_data = request.get_json()
        #isValid = proofEngine.checkGoal(json_data['goal'])
        errLog = ['error1', 'error2']
        debugStatus=False #get rid of this later
        print(json_data['goal'])
        exprList,errLog = recParser.preProcess(json_data['goal'],errLog=[],debug=debugStatus)
        if errLog==[]:
            exprTree = recParser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
            labeledTree = Labeler.labelTree(exprTree)
            decTree, errLog = Decorator.decorateTree(labeledTree,errLog)
            decTree, errLog = Decorator.checkFunctions(decTree,errLog)
            print(errLog)
        #if not errLog:
        #    errLog = Decorator.remTemps(decTree, errLog)
        isValid = (errLog==[])
        #print(errLog) #prints to python console in VSC
        return jsonify({'isValid': isValid, 'errors': errLog }), 200

if __name__ == '__main__':
    app.run(host='localhost', port=9095, debug=True)
