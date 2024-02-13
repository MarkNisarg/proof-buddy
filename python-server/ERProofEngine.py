from ProofEngine import ProofEngine
from Expression import Expression, ExpressionIdentifier
from Token import Token, TokenIdentifier
from ERType import ERType
from Parser import Parser


class ERProofEngine(ProofEngine):
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier],
                 erTypes:list[ERType]):
        super().__init__()

        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionIdentifiers
        self.erTypes = erTypes
        self.parser = Parser(self.tokenIdentifiers,self.expressionTypes,self.erTypes)
    
    def evaluate_subexpression(self,subexpression:ERType) -> ERType:
        pass

