from __future__ import annotations
import re
from copy import deepcopy

class Token():
    """
    Holds each element that makes up an Expression. Can be a name, a symbol, or a value.
    Tokens are created by the Parser when tokenizing an expression string and hold the value of
    an element, along with the TokenIdentifier that defined how to identify it. These can be printed
    back out using regex either as the literal string that was originally captured, or a set string
    value such as a nontypable character 'λ'
    """
    def __init__(self:'Token', tokenIdentifier:'TokenIdentifier', regexMatch:re.Match[str]):
        self.id = tokenIdentifier
        self.regexMatch = regexMatch
        self.isTerminal = tokenIdentifier.isTerminal
    
    def __str__(self:'Token'):
        return self.regexMatch.expand(self.id.printRegex)
    
    def __repr__(self:'Token'):
        return f'{type(self).__name__}({self.id},Match object,{self.isTerminal})'


class TokenIdentifier():
    """
    A TokenIdentifier holds the regex string the identifies a string as a particular element within an
    Expression. The Parser class uses this to generate a list of Tokens from the raw Expression string.
    Terminals are immediately wrapped in an Expression object before ExpressionIdentifiers are processed.
    These can be ORed together so that you can define a sequence in an ExpressionIdentifier such as
    [open_parens, tTrue|tFalse, closed_parens] that allows a single token to be either of multiple options.
    This is done by creating a joint TI, say TI_o, that holds each TI being ORed together in the ORing_operands
    field. The match method only has to satisfy one of these and return which one is satisfied.
    """
    def __init__(self, name:str, recognizeRegex:str, printRegex:str, isTerminal:bool=False):
        self.name = name
        self.recognizeRegex = None
        self.printRegex = printRegex
        self.generic = False
        self.isTerminal = isTerminal
        self.ORing_operands = [self]
        if recognizeRegex != None:
            self.recognizeRegex = re.compile(recognizeRegex)
    
    # This method is for creating a dummy "token" that takes the place of a subexpression
    def getGeneric(name:str) -> TokenIdentifier:
        genericToken = TokenIdentifier(name,'','')
        genericToken.generic = True
        return genericToken
    
    def match(self, input: str) -> tuple[Token|None, str]:
        if len(self.ORing_operands) == 1:
            match = self.recognizeRegex.match(input)
            
            if match != None:
                rest_of_line = input[len(match.group(0)):len(input)]
                return Token(self,match), rest_of_line
            return None, input
        else:
            for operand in self.ORing_operands:
                found, rest_of_line = operand.match(input)
                if found != None:
                    return found, rest_of_line
            return None, input

    # For creating ExpressionTypes where a token can be of multiple types
    # This will probably need to be implemented with a list for each property
    def __or__(self, other:TokenIdentifier) -> TokenIdentifier:
        ORed_tokenIdentifier = TokenIdentifier(f'{self.name}|{other.name}',None,None)
        ORed_tokenIdentifier.ORing_operands = [deepcopy(self),deepcopy(other)]
        return ORed_tokenIdentifier
    
    def __eq__(self,other:TokenIdentifier) -> bool:
        # Matching against 'Any' should be false because it needs to be an Expression first
        if isinstance(other,str):
            return False
        elif len(self.ORing_operands) == 1 and len(other.ORing_operands) == 1:
            return self.name == other.name
        for t in self.ORing_operands:
            for t2 in other.ORing_operands:
                if t == t2:
                    return True
        return False
    
    def __str__(self) -> str:
        return f'{self.name}'
    
    def __repr__(self) -> str:
        return f'{type(self).__name__}({self.name},{self.recognizeRegex},{self.printRegex},{self.isTerminal})'
    