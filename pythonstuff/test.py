from Parser import Parser, TokenType, ExpressionType
from TList import TList


def defineTFL():
    tVar = TokenType('Variable',r'([A-Z])',r'\1',True)
    tTrue = TokenType('True',r'True|TRUE','True',True)
    tFalse = TokenType('False',r'False|FALSE','False',True)
    tAnd = TokenType('And',r'([&^∧])','∧')
    tOr = TokenType('Or',r'([v|∨])','∨')
    tNot = TokenType('Not',r'([~-¬])','¬')
    tImplies = TokenType('Implies',r'(->|>|→)','→')
    tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
    tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
    tWhitespace = TokenType('Whitespace',r'\s+',' ')
    tBicond = TokenType('Biconditional',r'(<->|↔)','↔')
    tContradiction = TokenType('Contradiction',r'!','⊥',True)
    tokenList = TList[TokenType](TokenType,[tVar,tTrue,tFalse,tAnd,tOr,tNot,tImplies,tOpenParens,tClosedParens,
                                    tWhitespace,tBicond,tContradiction])

    tExpression = TokenType.getGeneric('Expression')
    eVar = ExpressionType('Variable',TList[TokenType](TokenType, [tVar]))
    # eBoolean = ExpressionType('Boolean',TList(TokenType,[tTrue|tFalse|tContradiction]))
    eAnd = ExpressionType('And',TList[TokenType](TokenType, [tExpression, tAnd, tExpression]))
    eOr = ExpressionType('Or',TList[TokenType](TokenType, [tExpression, tOr, tExpression]))
    eNot = ExpressionType('Not',TList[TokenType](TokenType, [tNot, tExpression]))
    eParens = ExpressionType('Parentheses',TList[TokenType](TokenType, [tOpenParens, tExpression, tClosedParens]))
    eImplies = ExpressionType('Implication',TList[TokenType](TokenType, [tExpression, tImplies, tExpression]))
    eBicond = ExpressionType('Biconditional',TList[TokenType](TokenType, [tExpression, tBicond, tExpression]))
    eContradiction = ExpressionType('Contradiction',TList[TokenType](TokenType, [tContradiction]))
    expressionList = TList[ExpressionType](ExpressionType, [eVar,eAnd,eOr,eNot,eParens,eImplies,eBicond,eContradiction])
    return tokenList, expressionList

def defineER():
    tNumber = TokenType('Number',r'\d+','\1')
    tTrue = TokenType('True',r'#t','#t')
    tFalse = TokenType('False',r'#f','#f')
    tSymbol = TokenType('Symbol',r'[A-Z]','\1')
    tPlus = TokenType('Plus',r'+','+')
    tMinus = TokenType('Minus',r'-','-')
    tTimes = TokenType('Times',r'*','*')
    tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
    tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
    tokenList = TList(TokenType,[tNumber,tTrue,tFalse,tSymbol,tPlus,tMinus,tTimes,tOpenParens,tClosedParens])

    tExpression = TokenType.getGeneric('Expression')
    # eInteger = ExpressionType('Integer',TList(TokenType,[tNumber]))
    eBoolean1 = ExpressionType('Boolean',TList[TokenType]([tTrue]))
    eBoolean2 = ExpressionType('Boolean',TList[TokenType]([tFalse]))
    eTerminal = ExpressionType('Terminal',TList[TokenType]([tSymbol]))
    eAdd = ExpressionType('Add',TList[TokenType]([tOpenParens,tPlus,tNumber,tNumber,tClosedParens]))

tokenList, expressionList = defineTFL()
tflParser = Parser(tokenList, expressionList)
testString1 = '(A&B)vC'
testString2 = '(AvB)->D'
testER1 = '(λ (n) (if (zero? n) 1 (* n (fact (- n 1)))))'
# thing = tflParser.tokenize(testString2)
thing2 = tflParser.parse(testString1)
print(testString1)
print(thing2)

