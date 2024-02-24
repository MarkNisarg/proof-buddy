from __future__ import annotations
import re
from copy import deepcopy

class Token():
    # regexMatch is now a list of strings/characters, full matching string is printed with __str__
    # moved isTerminal out of TokenIdentifier
    def __init__(self:'Token', tokenIdentifier:'TokenIdentifier', regexMatch:re.Match, printRegex:str, isTerminal:bool=False, debug=False):
        self.id = tokenIdentifier
        self.regexMatch = regexMatch
        self.isTerminal = isTerminal
        self.debug = debug
    
    def __str__(self:'Token'):
        if self.debug:
            return self.regexMatch[0]
        else:
            return self.regexMatch.expand(self.id.printRegex)
    
    def __repr__(self:'Token'):
        return f'{type(self).__name__}({self.id},matchObject,{self.isTerminal})'


class TokenIdentifier():
    def __init__(self, name:str, recognizeRegex:re.Pattern, printRegex:str):
        self.name = name
        self.recognizeRegex = recognizeRegex
        self.printRegex = printRegex
        self.generic = False
        self.ORing_operands = len(recognizeRegex)
    
    # This method is for creating a dummy "token" that takes the place of a subexpression
    '''   
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
    '''

    # added boolean function to detect matches for tokenIdentfiers
    def hasMatch(self, input: str) -> bool:
        regex = re.compile(self.recognizeRegex)
        match = regex.match(input)
        
        return match != None

    # For creating ExpressionTypes where a token can be of multiple types
    # This will probably need to be implemented with a list for each property
    # fixed ORed_tokenIdentifier to be flattened out and not nested
    def __or__(self, other:TokenIdentifier):
        ORed_tokenIdentifier = TokenIdentifier(f'{self.name}|{other.name}', self.recognizeRegex + other.recognizeRegex, f'{self.printRegex}|{other.printRegex}')
        return ORed_tokenIdentifier
    
    # moved from ExpressionIdentifier to here
    def __eq__(self,other:TokenIdentifier|str):
        if isinstance(other, str):
            return False
        if self.ORing_operands == 1 and other.ORing_operands == 1:
            return self.name == other.name
        for e in self.ORing_operands:
            for e2 in other.ORing_operands:
                if e != e2:
                    return False
        return True
    
    def __str__(self):
        return f'{self.name}'
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.recognizeRegex},{self.printRegex})'
    