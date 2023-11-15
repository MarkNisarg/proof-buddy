from proofs.Rule import Rule
from proofs.TList import TList

class RuleList(TList):
    def __init__(self):
        self.name = ''
        self.rules = TList(Rule)
        pass