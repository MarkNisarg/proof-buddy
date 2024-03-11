from ProofEngine import ProofEngine
from Expression import Expression, ExpressionIdentifier
from Token import Token, TokenIdentifier
# from ERType import ERType
from Parser import Parser


class ERProofEngine(ProofEngine):
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier]):
        # super().__init__(tokenIdentifiers,expressionIdentifiers)

        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionIdentifiers
        # self.erTypes = erTypes
        self.parser = Parser(self.tokenIdentifiers,self.expressionTypes)
    
    # def evaluate_subexpression(self,subexpression:ERType) -> ERType:
    #     pass

    def parse_expression(self,expr_str:str) -> Expression:
        return self.parser.parse(expr_str)
