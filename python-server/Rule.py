from __future__ import annotations
from Proof import Proof
from Expression import Expression
from GUID import GUID

class Rule(Proof):
    """
    Extends Proof and can be used within a Justification to provide the reason for converting some subexpression
    from one form to another.
    """
    def __init__(self, proof:Proof):
        # Basically, if the proof is valid, copy all fields to a Rule object
        # (or maybe type cast) from proof and add additional fields as necessary
        if isinstance(proof,Proof):
            self.name = proof.name
            self.premises = proof.premises
            self.conclusion = proof.conclusion
            self.content = proof.content
            self.title = proof.name
            self.id = GUID('Rule',proof.id)
        self.isFIAT = False        
        
    def canApply(self,premises:list[Expression]) -> bool:
        """
        Checks to see if the premises of the Rule's proof match the premises provided. If the isFIAT flag
        is set, then this only returns True so that it can bypass the check in Justification.
        """
        if self.isFIAT:
            return True
        for i,p in enumerate(self.premises):
            if p != premises[i]:
                return False
        return True

    def apply(self,premises:list[Expression],expression:Expression) -> Expression|None:
        """
        Calls canApply, and if true returns the conclusion of the Rule's proof
        """
        if self.isFIAT:
            return expression
        if self.canApply(premises + [expression]):
            return self.conclusion
        else:
            return None
    
    @staticmethod
    def FIAT() -> Rule:
        """
        Static method that returns a Rule object with the isFIAT flag set to true which bypasses validity checks.
        """
        rule = Rule(None)
        rule.isFIAT = True
        return rule
    
    @staticmethod
    def premise() -> Rule:
        """
        Shortcut for referencing FIAT for justifying premises that don't need to be checked
        """
        return Rule.FIAT()