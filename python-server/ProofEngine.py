from Token import TokenIdentifier
from Expression import ExpressionIdentifier
from Parser import Parser

class ProofEngine():
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionIdentifiers
        self.parser = Parser(tokenIdentifiers,expressionIdentifiers,None)

    def generateRacketFromRule(self, rule:str):
        return 'successful'