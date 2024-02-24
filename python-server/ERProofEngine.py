from ProofEngine import ProofEngine
from Expression import Expression, ExpressionIdentifier
from Token import Token, TokenIdentifier
# from ERType import ERType
from Parser import Parser


class ERProofEngine(ProofEngine):
    """
    The ERProofEngine extends the ProofEngine class by adding Types to Expressions and can
    thus evaluate an Expression as having a particular value. Generally anything not specific
    to Types will be handled by the parent class, and unless it needs to be overwritten, only
    the Type specific behavior will need to be defined in this file.
    """
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
