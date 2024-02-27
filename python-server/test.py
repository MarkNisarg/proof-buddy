from Parser import Parser
import EquationalReasoning as ER

# This should probably be removed from the git repo later, but is used as a scratch pad for
# testing functionality. Later we will add unit tests.

# def defineTFL():
#     # Define the individual types of tokens that can be used to construct an expression
#     # These may be individual characters, but may be multiple characters each
#     tVar = TokenType('Variable',r'([A-Z])',r'\1',True)
#     tTrue = TokenType('True',r'True|TRUE','True',True)
#     tFalse = TokenType('False',r'False|FALSE','False',True)
#     tAnd = TokenType('And',r'([&^∧])','∧')
#     tOr = TokenType('Or',r'([v\|∨])','∨')
#     tNot = TokenType('Not',r'([~-¬])','¬')
#     tImplies = TokenType('Implies',r'(->|>|→)','→')
#     tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
#     tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
#     tWhitespace = TokenType('Whitespace',r'\s+',' ')
#     tBicond = TokenType('Biconditional',r'(<->|↔)','↔')
#     tContradiction = TokenType('Contradiction',r'!','⊥',True)
#     tokenList = TList[TokenType](TokenType,[tVar,tTrue,tFalse,tAnd,tOr,tNot,tImplies,tOpenParens,tClosedParens,
#                                     tWhitespace,tBicond,tContradiction])

#     # Define the ExpressionTypes that represent how each type of expression is constructed from tokens or
#     # subexpressions. The 'Generic' ExpressionType is used to match against anything that is already an
#     # expression. Booleans for now don't work as a group of Tokens because ORing functionality isn't implemented 
#     # yet.
#     tExpression = TokenType.getGeneric('Expression')
#     eVar = ExpressionIdentifier('Variable',TList[TokenType](TokenType, [tVar]))
#     # eBoolean = ExpressionType('Boolean',TList(TokenType,[tTrue|tFalse|tContradiction]))
#     eAnd = ExpressionIdentifier('And',TList[TokenType](TokenType, [tExpression, tAnd, tExpression]))
#     eOr = ExpressionIdentifier('Or',TList[TokenType](TokenType, [tExpression, tOr, tExpression]))
#     eNot = ExpressionIdentifier('Not',TList[TokenType](TokenType, [tNot, tExpression]))
#     # The eParens ExpressionType simply wraps a given expression in parentheses and any validity and identity
#     # checks gets passed through the subexpression
#     eParens = ExpressionIdentifier('Parentheses',TList[TokenType](TokenType, [tOpenParens, tExpression, tClosedParens]))
#     eImplies = ExpressionIdentifier('Implication',TList[TokenType](TokenType, [tExpression, tImplies, tExpression]))
#     eBicond = ExpressionIdentifier('Biconditional',TList[TokenType](TokenType, [tExpression, tBicond, tExpression]))
#     eContradiction = ExpressionIdentifier('Contradiction',TList[TokenType](TokenType, [tContradiction]))
#     expressionList = TList[ExpressionIdentifier](ExpressionIdentifier, [eVar,eAnd,eOr,eNot,eParens,eImplies,eBicond,eContradiction])
#     return tokenList, expressionList



# This will be the general workflow for defining a proof engine (at least for parsing)
EREngine = ER.create_proofEngine()

test_strings_tfl = [
    '(A&B)vC', # A,B,C,A&B,(A&B),(A&B)vC
    # '(AvB)->D', # A,B,D,AvB,(AvB),(AvB)->D
    # 'Av(B->C)', # A,B,C,B->C,(B->C),Av(B->C)
    # 'AvB->C', # This should fail but currently parses as A,B,C,AvB,AvB->C
    # '((A->B)&(B<->C))->D', #A,B,B,C,D,A->B,(A->B),B<->C,(B<->C),(A->B)&(B<->C),((A->B)&(B<->C)),((A->B)&(B<->C))->D
]
# ER isn't ready yet but should in theory be handled similarly
test_strings_er = [
    # '(λ (n) (if (zero? n) 1 (* n (fact (- n 1)))))',
    '(#t)'
]
good_er = [
    '(#f)',
    '  (   #t   )',
    '#t',
    '((#t))',
    '(#t #t)',
    '((#t)#t)',
    '((#t) #t)',
    '((#t)(#t))',
    '(#t     #t)'
]
bad_er = [
    '(#t#t)',
    '(#x)',
    '(#t)(#t)',
    '(##t)',
    '(#tt)',
    '(#)',
    '(t)',
    '(#t',
    '#t)'
]

print('Good Tests:')
for test in good_er:
    print(f"'{test}'")
    try:
        test_expr = EREngine.parse_expression(test)
        print(test_expr)
    except Exception as e:
        print(e)
    print()

print('Bad Tests:')
for test in bad_er:
    print(f"'{test}'")
    try:
        test_expr = EREngine.parse_expression(test)
        print(test_expr)
    except Exception as e:
        print(e)
    print()

