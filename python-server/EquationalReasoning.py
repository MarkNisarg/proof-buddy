from Token import TokenIdentifier
from Expression import ExpressionIdentifier
from ERType import ERType,ERTypeIdentifier
from ERProofEngine import ERProofEngine

def parseInt(erType:ERType) -> int:
    try:
        num = int(f'{erType}')
        return num
    except:
        print(f'Cannot parse int: {erType}')

def parseBool(erType:ERType) -> bool:
    if f'{erType}' == 'True':
        return True
    elif f'{erType}' == 'False':
        return False
    print(f'Cannot parse boolean: {erType}')

def throwError(erType:ERType):
    print('ERROR')

def create_proofEngine() -> ERProofEngine:
    tNumber = TokenIdentifier('Number',r'(\d+)',r'\g<1>')
    tTrue = TokenIdentifier('True',r'#t|#T','#t')
    tFalse = TokenIdentifier('False',r'#f|#F','#f')
    tLambda = TokenIdentifier('Lambda',r'λ|#L','λ')
    tError = TokenIdentifier('Error',r'ERROR|error',r'ERROR')
    tName = TokenIdentifier('Name',r'(\w+)',r'\g<1>')
    tokenIdentifiers = [tNumber,tTrue,tFalse,tLambda,tError,tName]

    eNumber = ExpressionIdentifier('Number',[tNumber])
    eBoolean = ExpressionIdentifier('Boolean',[tTrue])
    expressionIdentifiers = [eNumber,eBoolean]

    rNumber = ERTypeIdentifier.create_Literal('Number',[eNumber],parseInt)
    rBool = ERTypeIdentifier.create_Literal('Bool',[eBoolean],parseBool)
    rError = ERTypeIdentifier.create_Error('Error',throwError)
    rList = ERTypeIdentifier.create_List('List',['any'],None)
    erTypes = [rNumber,rBool,rError,rList]

    erProofEngine = ERProofEngine(tokenIdentifiers,expressionIdentifiers,erTypes)
    return erProofEngine