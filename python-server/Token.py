from __future__ import annotations
import re
from copy import deepcopy

class Token():
    def __init__(self:'Token', tokenIdentifier:'TokenIdentifier', regexMatch:re.Match[str]):
        self.id = tokenIdentifier
        self.regexMatch = regexMatch
        self.isTerminal = tokenIdentifier.isTerminal
    
    def __str__(self:'Token'):
        return self.regexMatch.expand(self.id.printRegex)
    
    def __repr__(self:'Token'):
        return f'{type(self).__name__}({self.id},Match object,{self.isTerminal})'


class TokenIdentifier():
    def __init__(self, name:str, recognizeRegex:str, printRegex:str, isTerminal:bool=False):
        self.name = name
        self.recognizeRegex = recognizeRegex
        self.printRegex = printRegex
        self.generic = False
        self.isTerminal = isTerminal
        self.ORing_operands = [self]
    
    # This method is for creating a dummy "token" that takes the place of a subexpression
    def getGeneric(name:str):
        genericToken = TokenIdentifier(name,'','')
        genericToken.generic = True
        return genericToken
    
    def get_ORed_state(operands:list[TokenIdentifier]):
        name = operands[0].name
        for o in operands[1:len(operands)]:
            name += f'/{o.name}'
        ORed_tokenIdentifier = TokenIdentifier(name,None,None)
        for o in operands:
            ORed_tokenIdentifier.ORing_operands.append(deepcopy(o))
        return ORed_tokenIdentifier
    
    def match(self, input: str) -> Token|None:
        if len(self.ORing_operands) == 1:
            regex = re.compile(self.recognizeRegex)
            match = regex.match(input)
            
            if match != None:
                return Token(self,match)
            return None
        else:
            for operand in self.ORing_operands:
                found = operand.match(input)
                if found != None:
                    return found
            return None

    # For creating ExpressionTypes where a token can be of multiple types
    # This will probably need to be implemented with a list for each property
    def __or__(self, other:TokenIdentifier):
        ORed_tokenIdentifier = TokenIdentifier(f'{self.name}|{other.name}',None,None)
        ORed_tokenIdentifier.ORing_operands = [deepcopy(self),deepcopy(other)]
        return ORed_tokenIdentifier
    
    def __eq__(self,other:TokenIdentifier):
        if isinstance(self,str) or isinstance(other,str):
            return True
        elif len(self.ORing_operands) == 1 and len(other.ORing_operands) == 1:
            return self.name == other.name
        for e in self.ORing_operands:
            for e2 in other.ORing_operands:
                if e == e2:
                    return True
        return False
    
    def __str__(self):
        return f'{self.name}'
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.recognizeRegex},{self.printRegex},{self.isTerminal})'
    