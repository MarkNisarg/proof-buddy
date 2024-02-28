from Token import TokenIdentifier
from Expression import ExpressionIdentifier, RacketType, Expression
# from ERType import ERType,ERTypeIdentifier
from ERProofEngine import ERProofEngine

# This file defines the Equational Reasoning 'language' and grammar that instructs
# the Parser how to construct Expressions. It also creates the ERProofEngine that will
# handle all actions called by the frontend through app.py. The method create_ProofEngine
# will need to be called within app.py in order to instantiate an instance of ERProofEngine
# that knows the ER language and has the corresponding Parser object. Other 'languages' such
# as TFL and FOL will need to be defined in their own similaly named files and called within
# app.py somehow in order to switch proof engines.


# def parseInt(erType:ERType) -> int:
#     try:
#         num = int(f'{erType}')
#         return num
#     except:
#         print(f'Cannot parse int: {erType}')

# def parseBool(erType:ERType) -> bool:
#     if f'{erType}' == 'True':
#         return True
#     elif f'{erType}' == 'False':
#         return False
#     print(f'Cannot parse boolean: {erType}')

# def throwError(erType:ERType):
#     print('ERROR')

def add(addend1:Expression, addend2:Expression):
    pass

def subtract(minuend:Expression, subtrahend:Expression):
    pass

def identity(expr:Expression):
    pass

def define_identifiers() -> tuple[list[TokenIdentifier], list[ExpressionIdentifier]]:
    tOpenParens = TokenIdentifier('Open_parens',r'\(','(')
    tClosedParens = TokenIdentifier('Closed_parens',r'\)',')')
    tNumber = TokenIdentifier('Number',r'(\d+)',r'\g<1>',True)
    tTrue = TokenIdentifier('True',r'#t|#T','#t')
    tFalse = TokenIdentifier('False',r'#f|#F','#f')
    # tLambda = TokenIdentifier('Lambda',r'Lambda|λ|#L','λ')
    #tError = TokenIdentifier('Error',r'ERROR|error',r'ERROR')
    # tName = TokenIdentifier('Name',r'(\w+)',r'\g<1>')
    #tPlus = TokenIdentifier('Plus',r'\+',r'\+')
    #tMinus = TokenIdentifier('Minus',r'\-',r'\-')
    tokenIdentifiers = [tOpenParens,tClosedParens,tNumber,tTrue,tFalse]

    eAny = ExpressionIdentifier.getGeneric('Any')
    # eInt = ExpressionIdentifier('Int',[tNumber])
    eBool = ExpressionIdentifier('Bool',[tTrue|tFalse])
    # eName = ExpressionIdentifier('Name',[tName|tLambda])
    eList = ExpressionIdentifier('List',[[tOpenParens,eAny,tClosedParens],[tOpenParens,eAny,eAny,tClosedParens]])
    # eAny = ExpressionIdentifier('Any',[[eBool|eList]])
    expressionIdentifiers = [eBool,eList,eAny]

    return (tokenIdentifiers,expressionIdentifiers)

def create_proofEngine() -> ERProofEngine:
    TIs, EIs = define_identifiers()
    erProofEngine = ERProofEngine(TIs,EIs)
    return erProofEngine