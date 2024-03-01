import Parser, Labeler
from typeFile import Type
from Decorator import decorateTree

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

for test in test_strings_ok+test_strings_err:
    print(f"input = {test}")
    debugStatus = False
    exprList,errLog = Parser.preProcess(test,errLog=[],debug=debugStatus)
    if not errLog:
        exprTree = Parser.buildTree(exprList, debug=debugStatus)[0]
        labeledTree = Labeler.labelTree(exprTree)
        treeStr = printLabeledTree(labeledTree)
        print(treeStr)
    else:
        print(errLog)

#test = '((if #t + *) 3 4)'
#test='(+ 3 4)'
test = '(+ null #f ab#c 345 () 6)'
exprList,errLog = Parser.preProcess(test,errLog=[],debug=debugStatus)
exprTree = Parser.buildTree(exprList,debug=debugStatus)[0] # might not need to pass errLog
labeledTree = Labeler.labelTree(exprTree)
decTree, errLog = decorateTree(labeledTree,errLog)

print(isinstance(decTree,Parser.Node))
decTree.fullDebug(True)
print(test)
print(labeledTree)
print(errLog)

for x in Type:
    print(x.value)
    