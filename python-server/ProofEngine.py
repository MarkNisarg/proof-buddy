from Token import TokenIdentifier
from Expression import ExpressionIdentifier

class ProofEngine():
    def __init__(self):
        self._tokenIdentifiers = list[TokenIdentifier]()
        self._expressionTypes = list[ExpressionIdentifier]()
        self._parser = None

    def generateRacketFromRule(self, rule:str):
        return rule