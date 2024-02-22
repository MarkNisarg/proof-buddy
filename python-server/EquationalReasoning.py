from Token import TokenIdentifier
from Expression import ExpressionIdentifier, RacketType, Expression
# from ERType import ERType,ERTypeIdentifier
from ERProofEngine import ERProofEngine

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

def create_proofEngine() -> ERProofEngine:

    # modified regex patterns to be list of regex patterns
    tOpenParens = TokenIdentifier('Open_parens',[r'\('],'(')
    tClosedParens = TokenIdentifier('Closed_parens',[r'\)'],')')
    tNumber = TokenIdentifier('Number',[r'(\d+)'],r'\g<1>')
    tTrue = TokenIdentifier('True',[r'#t|#T'],'#t')
    tFalse = TokenIdentifier('False',[r'#f|#F'],'#f')
    #tLambda = TokenIdentifier('Lambda',[r'Lambda|λ|#L'],'λ')
    #tError = TokenIdentifier('Error',r'ERROR|error',r'ERROR')
    tName = TokenIdentifier('Name',[r'(\w+)'],r'\g<1>')
    #tPlus = TokenIdentifier('Plus',r'\+',r'\+')
    #tMinus = TokenIdentifier('Minus',r'\-',r'\-')
    tokenIdentifiers = [tOpenParens,tClosedParens,tNumber,tTrue,tFalse,tName]

    # modified structure attribute to be a list of structures to match
    eInt = ExpressionIdentifier('Int',[[tNumber]])

    # refactored __or__ operation for ExpressionIdentifiers
    eBool = ExpressionIdentifier('Bool',[[tTrue]]) | ExpressionIdentifier('Bool',[[tFalse]]) 
    eName = ExpressionIdentifier('Name',[[tName]])
    eList = ExpressionIdentifier('List',[[tOpenParens,'Any',tClosedParens]])
    # eAny = ExpressionIdentifier('Any',[[eInt|eBool|eList|eName],['Any','Any']])
    expressionIdentifiers = [eBool, eInt, eName, eList]
    # ''',eBool,eName,eList,eAny'''

    # rNumber = ERTypeIdentifier.create_Literal('Number',[eNumber],parseInt)
    # rBool = ERTypeIdentifier.create_Literal('Bool',[eBoolean],parseBool)
    # rError = ERTypeIdentifier.create_Error('Error',throwError)
    # rList = ERTypeIdentifier.create_List('List',['any'],None)
    # erTypes = [rNumber,rBool,rError,rList]

    erProofEngine = ERProofEngine(tokenIdentifiers,expressionIdentifiers)
    return erProofEngine