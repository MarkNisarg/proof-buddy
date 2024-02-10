from ProofEngine import ProofEngine
from Expression import Expression, ExpressionIdentifier
from Token import Token, TokenIdentifier
from ERType import ERType
from Parser import Parser


class ERProofEngine(ProofEngine):
    def __init__(self):
        super().__init__()

        self.tokenIdentifiers = self.create_TokenIdentifiers()
        self.expressionTypes = self.create_ExpressionTypes()
        self.erTypes = self.create_ERTypes()
        self.parser = Parser(self.tokenIdentifiers,self.expressionTypes)
    
    def create_TokenIdentifiers(self):
        return [
            TokenIdentifier('Number', r'(\d+)', r'\g<1>'),
            TokenIdentifier('True', r'#t|#T', '#t'),
            TokenIdentifier('False', r'#f|#F', '#f'),
            TokenIdentifier('Lambda', r'λ|#L', 'λ'),
            TokenIdentifier('Name',r'(\w+)',r'\g<1>')
        ]
    
    def create_ExpressionTypes(self):
        return [
            ExpressionIdentifier('Error',r'ERROR|error',r'ERROR')
        ]
    
    def create_ERTypes(self):
        return None
    
    def evaluate_subexpression(self,subexpression:ERType) -> ERType:
        pass

