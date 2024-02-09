from Parser import Parser, TokenType, ExpressionType
from TList import TList

# This should probably be removed from the git repo later, but is used as a scratch pad for
# testing functionality. Later we will add unit tests.

def defineTFL():
    # Define the individual types of tokens that can be used to construct an expression
    # These may be individual characters, but may be multiple characters each
    tVar = TokenType('Variable',r'([A-Z])',r'\1',True)
    tTrue = TokenType('True',r'True|TRUE','True',True)
    tFalse = TokenType('False',r'False|FALSE','False',True)
    tAnd = TokenType('And',r'([&^∧])','∧')
    tOr = TokenType('Or',r'([v\|∨])','∨')
    tNot = TokenType('Not',r'([~-¬])','¬')
    tImplies = TokenType('Implies',r'(->|>|→)','→')
    tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
    tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
    tWhitespace = TokenType('Whitespace',r'\s+',' ')
    tBicond = TokenType('Biconditional',r'(<->|↔)','↔')
    tContradiction = TokenType('Contradiction',r'!','⊥',True)
    tokenList = TList[TokenType](TokenType,[tVar,tTrue,tFalse,tAnd,tOr,tNot,tImplies,tOpenParens,tClosedParens,
                                    tWhitespace,tBicond,tContradiction])

    # Define the ExpressionTypes that represent how each type of expression is constructed from tokens or
    # subexpressions. The 'Generic' ExpressionType is used to match against anything that is already an
    # expression. Booleans for now don't work as a group of Tokens because ORing functionality isn't implemented 
    # yet.
    tExpression = TokenType.getGeneric('Expression')
    eVar = ExpressionType('Variable',TList[TokenType](TokenType, [tVar]))
    # eBoolean = ExpressionType('Boolean',TList(TokenType,[tTrue|tFalse|tContradiction]))
    eAnd = ExpressionType('And',TList[TokenType](TokenType, [tExpression, tAnd, tExpression]))
    eOr = ExpressionType('Or',TList[TokenType](TokenType, [tExpression, tOr, tExpression]))
    eNot = ExpressionType('Not',TList[TokenType](TokenType, [tNot, tExpression]))
    # The eParens ExpressionType simply wraps a given expression in parentheses and any validity and identity
    # checks gets passed through the subexpression
    eParens = ExpressionType('Parentheses',TList[TokenType](TokenType, [tOpenParens, tExpression, tClosedParens]))
    eImplies = ExpressionType('Implication',TList[TokenType](TokenType, [tExpression, tImplies, tExpression]))
    eBicond = ExpressionType('Biconditional',TList[TokenType](TokenType, [tExpression, tBicond, tExpression]))
    eContradiction = ExpressionType('Contradiction',TList[TokenType](TokenType, [tContradiction]))
    expressionList = TList[ExpressionType](ExpressionType, [eVar,eAnd,eOr,eNot,eParens,eImplies,eBicond,eContradiction])
    return tokenList, expressionList

def defineER():
    tNumber = TokenType('Number',r'\d+','\g<1>')
    tTrue = TokenType('True',r'#t','#t')
    tFalse = TokenType('False',r'#f','#f')
    tSymbol = TokenType('Symbol',r'[A-Z]','\g<1>')
    tPlus = TokenType('Plus',r'\+','+')
    tMinus = TokenType('Minus',r'-','-')
    tTimes = TokenType('Times',r'\*','*')
    tLambda = TokenType('Lambda',r'λ','λ')
    tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
    tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
    tokenList = TList(TokenType,[tNumber,tTrue,tFalse,tSymbol,tPlus,tMinus,tTimes,tLambda,tOpenParens,tClosedParens])

    eExpression = TokenType.getGeneric('Expression')
    # eInteger = ExpressionType('Integer',TList(TokenType,[tNumber]))
    eBoolean1 = ExpressionType('Boolean',[tTrue])
    eBoolean2 = ExpressionType('Boolean',[tFalse])
    eTerminal = ExpressionType('Terminal',[tSymbol])
    # For ER, parentheses are necessarily part of every expression and not a wrapper
    eAdd = ExpressionType('Add',[tOpenParens,tPlus,tNumber,tNumber,tClosedParens])
    expressionList = [eExpression, eBoolean1, eBoolean2, eTerminal, eAdd]
    return tokenList, expressionList

# This will be the general workflow for defining a proof engine (at least for parsing)
tokenList, expressionList = defineTFL()
tflParser = Parser(tokenList, expressionList)

test_strings_tfl = [
    '(A&B)vC', # A,B,C,A&B,(A&B),(A&B)vC
    # '(AvB)->D', # A,B,D,AvB,(AvB),(AvB)->D
    # 'Av(B->C)', # A,B,C,B->C,(B->C),Av(B->C)
    # 'AvB->C', # This should fail but currently parses as A,B,C,AvB,AvB->C
    # '((A->B)&(B<->C))->D', #A,B,B,C,D,A->B,(A->B),B<->C,(B<->C),(A->B)&(B<->C),((A->B)&(B<->C)),((A->B)&(B<->C))->D
]
# ER isn't ready yet but should in theory be handled similarly
test_strings_er = [
    '(λ (n) (if (zero? n) 1 (* n (fact (- n 1)))))'
]
for test in test_strings_tfl:
    print(test)
    test_expr = tflParser.parse(test, True)
    print(test_expr)
    print()

