from proofs.ExpressionList import ExpressionList
from proofs.Rule import Rule
from proofs.ProofLine import ProofLine
from proofs.Expression import Expression
from proofs.RuleList import RuleList
from proofs.TList import TList

class Proof:
    def __init__(self):
        self.premises : TList(Expression) = None
        self.conclusion : Expression = None
        self.allowed_rules : RuleList = None
        self.content : TList(ProofLine) = None
        self.isValid = False
        self.isComplete = False
        self.title = ''
    
    def setRules(self, rule_list=[]):
        rl = []
        for r in rule_list:
            if isinstance(r,Rule):
                self.allowed_rules += r
        self.allowed_rules = rl

    def addLine(self, proofLine=ProofLine()):
        if isinstance(proofLine, ProofLine):
            self.content += proofLine

    def checkValidity(self):
        pass

    def checkComplete(self):
        return self.checkValidity() & self.checkPremises() & self.checkConclusion()

    def checkPremises(self):
        pass

    def checkConclusion(self):
        pass

    def setConclusion(self, conclusion=None):
        if isinstance(conclusion, Expression):
            self.conclusion = conclusion
    
    def setPremises(self, premises=[]):
        prem_list = ExpressionList()
        for prem in premises:
            if isinstance(prem,Expression):
                prem_list += prem
        self.premises = prem_list