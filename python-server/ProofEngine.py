from Token import TokenIdentifier
from Expression import ExpressionIdentifier
from Parser import Parser

class ProofEngine():
    """
    The ProofEngine class is what handles all Proof operations requested by the frontend. It will need
    to be instantiated in the particular 'language' file, called by app.py, and selected as the active
    ProofEngine. This specific class (the parent of ERProofEngine) will handle all operations general to
    any Proof and will only be overwritten by subclasses if the behavior is particularly different. This
    parent class does not handle Types and treats Expression simply as groups of Tokens with no inherent
    value beyond the boolean that they exist. When the frontend gives the PE an expression as a string
    from the frontend, it will use the Parser class to convert this to an Expression object that it will
    then perform all subsequent actions on. The ExpressionIdentifiers and TokenIdentifiers that the Parser
    will need to know, should be passed thus to the ProofEngine upon construction.
    """
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionIdentifiers
        self.parser = Parser(tokenIdentifiers,expressionIdentifiers,None)

    def generateRacketFromRule(self, rule:str):
        return 'successful'