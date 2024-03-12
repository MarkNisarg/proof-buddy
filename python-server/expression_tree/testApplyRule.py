import recParser, Labeler, typeFile, Decorator

test_strings_ruleIf= [
    "(if #t 4 5)", #expected 4
    "(if #f x y)", #expected y
    "(if asd a a)", #expected a
    "(if #f b (c d e f g))", #expected (c d e f g)
    "(if x (abc) (abc) )", #expected (abc) 
    "(if #t (a b)(a))", #expected (a b)
    "(if #t (if #f x y) (z))", #expected (if #f x y)
    "(if a b c)", #expected (if a b c) no valid change to make based on rules
    "(if a (+ x (y (z z))) (+ x (y (z z))))", #expected (+ x (y (z z)))
    "(if a (+ x (y (z z))) (+ x (b (z z))))", #expected no valid change !!!not working as expected 
    "(fi #t x y)", #expected invalid
    "if #t x y", #expected invalid - should it give x? without () there are no child nodes so it doesnt read as a valid tree, is it supposed to?
    "()", #expected invalid
    "(if )", #expected invalid
    "(if #t b c d e)", #expected invalid
]

print("\napplyRule testing:\n")
for i in test_strings_ruleIf:
    print("input =", i)
    exprList,errLog = recParser.preProcess(i,errLog=[])
    exprTree = recParser.buildTree(exprList,)[0] # might not need to pass errLog
    labeledTree = Labeler.labelTree(exprTree)
    decTree, errLog = Decorator.decorateTree(labeledTree,errLog)
    errLog = Decorator.remTemps(decTree, errLog)
    decTree, errLog = Decorator.checkFunctions(decTree,errLog)
    decTree.applyRule('if')
    print("after rule =", decTree)