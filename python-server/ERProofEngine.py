from ProofEngine import ProofEngine
from Expression import Expression, ExpressionType
from Token import Token, TokenIdentifier
from ERType import ERType


class ERProofEngine(ProofEngine):
    def __init__(self):
        self.tokenIdentifiers = list[TokenIdentifier]()
        self.ExpressionTypes = list[ExpressionType]()
        self.ERTypes = list[ERType]()

        self.tokenIdentifiers = [TokenIdentifier('Number', r'(\d+)', r'\g<1>'),
        TokenIdentifier('True', r'#t|#T', '#t'),
        TokenIdentifier('False', r'#f|#F', '#f'),
        TokenIdentifier('Lambda', r'λ|#L', 'λ')]

