import re

class Token():
    def __init__(self:'Token', tokenType:'TokenType', regexMatch:re.Match[str]):
        self.tokenType = tokenType
        self.regexMatch = regexMatch
        self.isTerminal = tokenType.isTerminal
    
    def __str__(self:'Token'):
        return self.regexMatch.expand(self.tokenType.printRegex)
    
    def __repr__(self:'Token'):
        return f'{type(self).__name__}({self.tokenType},Match object,{self.isTerminal})'
    
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
    
    def parse(self, input: str):
        regex = re.compile(self.recognizeRegex)
        match = regex.match(input)
        
        if match != None:
            return Token(self,match)
        return None

    # For creating ExpressionTypes where a token can be of multiple types
    # This will probably need to be implemented with a list for each property
    def __or__(self:'Token', other:'Token'):
        return NotImplementedError
    
    def __str__(self):
        return f'{self.name}'
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.recognizeRegex},{self.printRegex})'
    