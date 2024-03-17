import recParser, Labeler, typeFile, Decorator

test_strings_ruleIf= [
    ("cons", "(cons (first '(1 2 3)) (rest '(1 2 3)))"),
    ("first", "(first (cons 3 '(1 2)))"),
    ("rest", "(rest (cons 3 '(1 2)))"),
    ("if", "(if #t 4 5)"), #expected 4
    ("if", "(if #f x y)"), #expected y
    ("if", "(if asd a a)"), #expected a
    ("if", "(if #f b (c d e f g))"), #expected (c d e f g)
    ("if", "(if x (abc) (abc) )"), #expected (abc) 
    ("if", "(if #t (a b)(a))"), #expected (a b)
    ("if", "(if #t (if #f x y) (z))"), #expected (if #f x y)
    ("if", "(if a b c)"), #expected (if a b c) no valid change to make based on rules
    ("if", "(if a (+ x (y (z z))) (+ x (y (z z))))"), #expected (+ x (y (z z)))
    ("if", "(if a (+ x (y (z z))) (+ x (b (z z))))"), #expected no valid change
    ("if", "(fi #t x y)"), #expected invalid
    ("if", "if #t x y"), #expected invalid - should it give x? without () there are no child nodes so it doesnt read as a valid tree, is it supposed to?
    ("if", "()"), #expected invalid
    ("if", "(if )"), #expected invalid
    ("if", "(if #t b c d e)"), #expected invalid
    ("null", "(null? (cons x (a b c)))"), #expected #f
    ("cons?", "(cons? (cons x a))"), #expected #t
    ('zero', '(zero? (+ 0 1))'), #expected #f
    ('zero', '(zero? (+ 0 0))'), #expected no change
    ('zero', '(zero? (+ a 1))'), #expected no change
]

print("\napplyRule testing:\n")
for rule, expr in test_strings_ruleIf:
    print("input =", expr)
    exprList,errLog = recParser.preProcess(expr,errLog=[])
    exprTree = recParser.buildTree(exprList,)[0] # might not need to pass errLog
    labeledTree = Labeler.labelTree(exprTree)
    decTree, errLog = Decorator.decorateTree(labeledTree,errLog)
    errLog = Decorator.remTemps(decTree, errLog)
    decTree, errLog = Decorator.checkFunctions(decTree,errLog)
    errLog = decTree.applyRule(rule, errLog)
    print("after rule =", decTree)