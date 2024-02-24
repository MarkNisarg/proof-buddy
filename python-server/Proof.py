from ExpressionList import ExpressionList
# from Rule import Rule
# from RuleList import RuleName
from ProofLine import ProofLine
from Expression import Expression
from RuleList import RuleList
from TList import TList
from GUID import GUID

# The Proof class will contain all the fields that a proof will need to know to pass along API calls.
# It will only store the information however and will call the necessary methods for parsing and
# validation from other classes so that multiple proof engines can be used.

# We might want to store both the initiial raw strings that the user entered, as well as the parsed
# expressions separately and have them fill out each other as needed

class Proof:
    """
    The Proof class holds all of the information within a proof displayed on the frontend and
    facilitates a ProofEngine in performing operations such as validating the Proof from line
    to line and applying Rules. A Proof generally contains a list of ProofLines, each containing
    an Expression object and a Justification (Rule and reference line numbers). It also has fields
    holding the premises and conclusion of the Proof, any Rules allowed to be used within it, and
    any other information a ProofEngine might need to know. A ProofEngine can also turn a Proof into
    a Rule which can be applied to other Proofs, but will still need to check the validity of the
    Proof when used as a Justification, unless the Proof simply contains the Justification FIAT.
    """
    def __init__(self):
        self.premises : TList(Expression) = None
        self.conclusion : Expression = None
        self.allowed_rules : RuleList = None
        self.content : TList(ProofLine) = None
        self.isValid = False
        self.isComplete = False
        self.title = ''
        self.id = GUID('proof')
    
    def setRules(self, rule_list:RuleList):
        if isinstance(rule_list,RuleList):
            self.allowed_rules = rule_list
        else:
            print('Error')

    def addLine(self, proofLine:ProofLine):
        if isinstance(proofLine, ProofLine):
            self.content += proofLine
        else:
            print('Error')

    def checkValidity(self):
        pass

    def checkComplete(self):
        return self.checkValidity() & self.checkPremises() & self.checkConclusion()

    def checkPremises(self):
        pass

    def checkConclusion(self):
        return self.conclusion == self.content[-1].argument

    def setConclusion(self, conclusion:Expression):
        if isinstance(conclusion, Expression):
            self.conclusion = conclusion
        else:
            print('Error')
    
    def setPremises(self, premises:TList[Expression]):
        if isinstance(premises,TList) and premises.T==Expression:
            self.premises = premises
        else:
            print('Error')

    # For testing the iterative structure of subproofs
    def print(self):
        print(f'{self}')

    def __str__(self):
        s = ''
        for line in self.content:
            s += f'{line}'
        return s