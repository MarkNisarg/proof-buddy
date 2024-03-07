import Parser, Labeler
from typeFile import *
from Decorator import decorateTree, checkFunctions, typeCheck, remTemps

def printLabeledTree(tree):
    retStr = f'Data: {tree.data}, Type: {tree.type}\n'
    for child in tree.children:
        retStr += printLabeledTree(child)
    return retStr

test_strings_ok = [
    '(λ (n) (if (zero? n) 1 (* n (fact (- n 1)))))',   #### How should λ be treated? Is this of type function? Should it be in the built in list? ####
    '(name?)', # test for variables   #### Should this be testing a variable or function? I thought only functions end in ?. Currently labeler will label this as an error ####
    '(#t)', # test for booleans
    '(3 4)', # test for numbers
    '(34 #t)',
    '34',
    '()', # test for the empty list
    '(#t (#t))',
    '#t',
    '((#t)#t)', #nested list with optional whitespace missing
    '((#t) #t)', #nested list with whitespace
    '((if #t + *) 3 4)', #NOTE: functions as terminal used to always be tricky in prior versions
    '(t)' #would fail if only testing booleans, but this could be a defined function with no inputs
]

test_strings_err = [
    '(#t #T)', #this wont be caught as an error until the udf naming restrictions get implemented
    '(+ 2 #t)', #this won't get caught as an error until types are implemented
    '(+ 2 3 4)', # this won't get caught as an error type inputs are checked (too many)
    '(+ 2)',  # too few inputs, also won't get caught yet
    '#t #t',
    '3 4',
    '',
    '((#t)',
    '(#t) (#t)',
    '(#t)(#t)',
    '(#t))',
    '($))' #testing having two errors in one (bad char and paren mismatch)
]
test_strings_typeGood=[ #all these should pass with no errors
    "(cons 3 '(+ 4 5))", # would eval to '(3 + 4 5)
    "(+ (+ 1 2) (if (= 3 3) 4 5))", # would eval to 7
    "(if x #t (not x))",  # should contain env of x.type=bool
    "(or (= x 1) y)", # env has x.type=int, y.type=bool
    "(cons x null)", # env has x.type=any
    "(> 3 5)", # this would eval to #f, but it's still a valid expr
    "(first null)", # this PASSES type checking, but wouldn't eval!
    "((if #t + *) 3 4)", # evals to 7
    "(rest (cons 5 null))", # would eval to null
    "(first (cons 5 null))", # would eval to 5
    "(if (= x +) (x 3 4) 7)" # would eventually eval to 7
]

test_strings_typeBad=[ #these should all pass labeling and decorating,but fail the final function checks
    "(+)", # "+ requires 2 arguments, but 0 were given"
    "(+ 3)", # "+ requires 2 arguments, but 1 was given"
    "(+ 4 5 6)", # "+ requires 2 arguments, but 3 were given"
    "(if x 3 x)", # "x cannot be type bool and type int"
    "(if #t 3 #t)", # "2nd and 3rd if arguments should be the same type, but argument#2 is int and argument#3 is bool". note: okay in real racket
    "(cons 3 (+ 4 5))", #cons must have argument#2 LIST but an INT was provided"
    "(+ 3 #t)", # + must have argument#2 int, but a bool was provided
    "(+ 3 (not x))", # + must have argument#2 int, but a bool was provided (env: x=bool)
    "(or #t 3)", # or must have argument#2 bool, but an int was provided
    "(or #t (+ 1 x))", # or must have argument#2 bool, but an int was provided (env: x=int)
    "((if #t + *) 3 4 5)", # "+/* has 2 arguments but 3 were provided"
    '(+ (+ 3 4 5) #t)', # should give two errors
    '(+ (+ 3 4 #t) #t)', # should give only two errors and NOT 3 errors (but 3 is ok)
    '(+ (+ #t 4 #5) #t)', # should give only two errors and NOT 3 errors (but 3 is ok)
]

test_strings_applyRule=[
    "(+ 3 4)", #expected 7
    "(or #t #f)", #expected True
    "(and #t #f)", #expected False
    "(< 2 9)", #expected True
    "(if #t 1 2)", #expected 1
    "(first 1 2 3 4)", #expected 1
    "(rest 1 2 3 4)", #expected [2, 3, 4]
    "(int? 1)", #expected True
]

for test in test_strings_ok+test_strings_err + test_strings_typeGood + test_strings_typeBad:
    print(f"input = {test}")
    debugStatus = False
    exprList,errLog = Parser.preProcess(test,errLog=[],debug=debugStatus)
    if not errLog:
        exprTree = Parser.buildTree(exprList, debug=debugStatus)[0]
        labeledTree = Labeler.labelTree(exprTree)
        decTree, errLog = decorateTree(labeledTree,errLog)
        if not errLog:
            errLog = remTemps(decTree, errLog)
        treeStr = printLabeledTree(decTree)
        print(treeStr)
    else:
        print(errLog)

test = '((if #t + *) 3 4)'
test = '(if #t + *)'
#test='(+ 3 4)'
#test = '(+ null #f ab#c 345 () 6)'
print("START " + test)
exprList,errLog = Parser.preProcess(test,errLog=[],debug=debugStatus)
exprTree = Parser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
labeledTree = Labeler.labelTree(exprTree)
decTree, errLog = decorateTree(labeledTree,errLog)
if not errLog:
    errLog = remTemps(decTree, errLog)
print(printLabeledTree(decTree))
print(errLog)
nt=decTree
n0 = decTree.children[0]
def checknode(x):
    print(f"data={x.data} type={x.type.getType()} num={x.numArgs}")

def fullcheck(x):
    checknode(x)
    for c in x.children:
        checknode(c)

print(nt)
fullcheck(nt)


#decTree, errLog = checkFunctions(labeledTree,errLog)
'''
print(isinstance(decTree,Parser.Node))
decTree.fullDebug(True)
print(test)
print(labeledTree)
print(errLog)
'''
testNode = Parser.Node()
t2 = RacType((None, Type.BOOL))
t3= RacType((None, Type.INT))
t4 = RacType((((None,Type.INT),),(None,Type.BOOL)))

print(t3.isType("INT"), t4.isType("FUNCTION"))
testNode.setType("FUNCTION")
print(str(testNode.type))

debugStatus = False
for i in test_strings_typeGood + test_strings_typeBad:
    print('input= ',i)
    exprList,errLog = Parser.preProcess(i,errLog=[],debug=debugStatus)
    exprTree = Parser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
    labeledTree = Labeler.labelTree(exprTree)
    decTree, errLog = decorateTree(labeledTree,errLog)
    errLog = remTemps(decTree, errLog)
    decTree, errLog = checkFunctions(decTree,errLog)
    print(decTree)
    print(errLog)


print("\n\t applyRule testing: \t\n")
for i in test_strings_applyRule:
    print("input =", i)
    exprList,errLog = Parser.preProcess(i,errLog=[],debug=debugStatus)
    exprTree = Parser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
    labeledTree = Labeler.labelTree(exprTree)
    decTree, errLog = decorateTree(labeledTree,errLog)
    errLog = remTemps(decTree, errLog)
    decTree, errLog = checkFunctions(decTree,errLog)
    #print(decTree)
    print(decTree.applyRule())
