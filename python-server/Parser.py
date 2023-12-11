# from Expression import Expression
from TList import TList
import re

# All used classes are self contained in one file to avoid circular references.
# This is not ideal for scale programming, but works for now.

# ExpressionType and Expression should likely extend from TokenType and Token respectively so that we
# can have homogenous lists for storing partially parsed expressions

# We will need to find a way to OR these together so that we can make more dynamic expression types
class TokenType():
    def __init__(self, name:str, recognizeRegex:str, printRegex:str, isTerminal:bool=False):
        self.name = name
        self.recognizeRegex = recognizeRegex
        self.printRegex = printRegex
        self.generic = False
        self.isTerminal = isTerminal
    
    # This method is for creating a dummy "token" that takes the place of a subexpression
    def getGeneric(name:str):
        genericToken = TokenType(name,'','')
        genericToken.generic = True
        return genericToken

    # For creating ExpressionTypes where a token can be of multiple types
    # This will probably need to be implemented with a list for each property
    def __or__(self:'Token', other:'Token'):
        return NotImplementedError
    
    def __str__(self):
        return f'{self.name}'
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.recognizeRegex},{self.printRegex})'

class Token():
    def __init__(self:'Token', tokenType:TokenType, regexMatch:re.Match[str]):
        self.tokenType = tokenType
        self.regexMatch = regexMatch
        self.isTerminal = tokenType.isTerminal
    
    def __str__(self:'Token'):
        return self.regexMatch.expand(self.tokenType.printRegex)
    
    def __repr__(self:'Token'):
        return f'{type(self).__name__}({self.tokenType},Match object,{self.isTerminal})'

# Likewise for TokenType, we should create a way to OR these together to make more dynamic ExpressionTypes
class ExpressionType:
    def __init__(self, name:str, structure:list):
        self.name = name
        self.structure = TList[TokenType](TokenType)
        for e in structure:
            if isinstance(e,TokenType):
                self.structure.append(e)
    
    def match(self:'ExpressionType', inputLine:list) -> (bool, int):
        for i in range(len(inputLine)-len(self.structure)+1):
            hasMatch = True
            for j in range(len(self.structure)):
                if isinstance(inputLine[i+j],Expression) and self.structure[j].generic:
                    continue
                if isinstance(inputLine[i+j],Expression) or self.structure[j].generic or \
                    inputLine[i+j].tokenType != self.structure[j]:
                        hasMatch = False
                        break
            if hasMatch:
                return (True, i)
        return (False, -1)
    
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.structure})'
    
class Expression:
    def __init__(self, type:'ExpressionType', subcomponents:TList=[], token:str=''):
        self.type = type
        self.token = token
        self.isRoot = False
        self.subcomponents = []
        
        # self.type = 
        # if subcomponents and not subcomponents.T == 'Expression':
        #     print('Error')
        # else:
        self.subcomponents = subcomponents

    def __str__(self):
        s = ''
        for c in self.subcomponents:
            s += f'{c}'
        return s
    
    def __repr__(self):
        return f'{type(self).__name__}({self.type},{self.subcomponents},\'{self.token}\')'
            
class Parser:
    def __init__(self, tokenTypes:TList[TokenType], expressionTypes:TList[ExpressionType]):
        self.tokenTypes = tokenTypes
        self.expressionTypes = expressionTypes

    def tokenize(self, inputLine:str) -> TList[Token]:
        tokens = TList[Token](Token)
        cursor = 0
        while cursor < len(inputLine):
            for t in self.tokenTypes:
                regex = re.compile(t.recognizeRegex)
                match = regex.match(inputLine, cursor)
                if match != None:
                    cursor += len(match.group(0))
                    tokens.append(Token(t,match))
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> Expression:
        # tokenize str->TList[Token]
        # Match TList[Token] to TList[ExpressionType] (recursively) to create Expression tree
        tokenList = list(self.tokenize(inputLine))
        for t_i, t in enumerate(tokenList):
            if t.isTerminal:
                if debug:
                    print(f'{t.tokenType.name}: {t}')
                    print()
                tokenList[t_i] = Expression(ExpressionType(t.tokenType.name, [t.tokenType]), f'{t}')
        while len(tokenList) > 1:
            for e in self.expressionTypes:
                found, index = e.match(tokenList)
                if found:
                    if debug:
                        print(f'{e.name}: {tokenList[index:index+len(e.structure)]!s}')
                        print()
                    new_expr = Expression(e, tokenList[index:index+len(e.structure)])
                    # I couldn't figure out how to pass a slice to __delitem__ for some reason
                    # It should support it
                    for i in range(len(e.structure)):
                        tokenList.__delitem__(index)
                    tokenList.insert(index, new_expr)
                    break
        return tokenList[0]

    def addTokenType(self, tokenType:TokenType):
        self.tokenTypes.append(tokenType)

    def addExpressionType(self, name:str, structure:TList[TokenType]):
        self.expressionTypes.append(structure)

    def printExpr(self, expr:Expression) -> str:
        pass