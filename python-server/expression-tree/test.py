import Parser, Labeler

test_strings_ok = [
    '(λ (n) (if (zero? n) 1 (* n (fact (- n 1)))))',
    '(name?)', # test for variables
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
    '($))' #testing having two errors in one (bad char )
]

for test in test_strings_ok+test_strings_err:
    print(f"input = {test}")
    debugStatus = False
    exprList,errLog = Parser.preProcess(test,errLog=[],debug=debugStatus)
    if not errLog:
        exprTree = Parser.buildTree(exprList, errLog, debug=debugStatus)[0]
        labeledTree = Labeler.labelTree(exprTree)
        print(labeledTree)
    else:
        print(errLog)