from flask import Flask, jsonify, request
from flask_cors import CORS
import Decorator, Labeler, recParser

# as a temp measure for MVP, we are storing in a global variable a list of all the trees we pass to front end
# in reality, frontend should be passing to the backend the entire string (or better yet, exprtree) of wherever the highlighting occurred
# starting arbitrarily with 1+2 as the initial tree, which should get immediately followed by a LHS/RHS goal
#  NOTE:  this kludge will FAIL if the user switches sides more than once.
PREV_RACKETS = [Decorator.decorateTree(Labeler.labelTree(recParser.buildTree(recParser.preProcess("(+ 1 2)",errLog=[])[0], debug=False)[0]),errLog=[])[0]]

EXPRESSION_TREE = None
ERROR_LOG = None
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
        EXPRESSION_TREE =PREV_RACKETS[-1] # really this should be passed from the front end
        ERROR_LOG = EXPRESSION_TREE.generateRacketFromRule(json_data['startPosition'], json_data['rule'], errLog=[])
        if isValid := (ERROR_LOG==[]):
            racketStr = str(EXPRESSION_TREE)
            PREV_RACKETS.append(EXPRESSION_TREE) #storing tree of most recently passed Racket
        else:
            racketStr = "Error generating racket"
        return jsonify({'isValid': isValid, 'racket': racketStr, 'errors': ERROR_LOG }), 200

@app.route('/api/v1/proof/check-goal', methods=['POST'])
def check_goal():
    with app.app_context():
        json_data = request.get_json()
        debugStatus=False #get rid of this later
        exprList,errLog = recParser.preProcess(json_data['goal'],errLog=[],debug=debugStatus)
        if errLog==[]:
            exprTree = recParser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
            labeledTree = Labeler.labelTree(exprTree)
            labeledTree, charCount = Labeler.fillPositions(labeledTree)
            decTree, errLog = Decorator.decorateTree(labeledTree,errLog)
            decTree, errLog = Decorator.checkFunctions(decTree,errLog)
            EXPRESSION_TREE = decTree
        ERROR_LOG = errLog
        isValid = (ERROR_LOG==[])
        if isValid:
            PREV_RACKETS.append(EXPRESSION_TREE) #storing most recently passed Racket
        return jsonify({'isValid': isValid, 'errors': ERROR_LOG }), 200

if __name__ == '__main__':
    app.run(host='localhost', port=9095, debug=True)
