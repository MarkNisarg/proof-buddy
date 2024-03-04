from Expression import Expression
from Justification import Justification
from Proof import Proof

class ProofLine:
    """
    Keeps track of the Expression and Justification objects for a given line and facilitates validation checks
    """
    def __init__(self, parent:Proof, argument:Expression|Proof, justification:Justification|None, line_no:list[int]=None):
        self.parent = parent
        if isinstance(line_no,list):
            self.line_no = line_no
        else:
            self.line_no = []
        self.argument = argument
        self.justification = justification
        if isinstance(argument,Proof):
            self.argument.prependLineNumber(line_no)
    
    @staticmethod
    def getNextLineNumber(lineNumber:list[int]) -> list[int]:
        """
        Given a line number as a list of numbers for each depth of proof, return the next one at the given depth.
        """
        new_lineNumber = lineNumber
        new_lineNumber[len(new_lineNumber)-1] += 1
        return new_lineNumber
    
    def checkValidity(self) -> bool:
        """
        Checks the Justification to see if it's Rule can apply to a subexpression of argument to form
        the next ProofLine in the parent proof. If the argument is a proof, then it calls checkValidity
        on that proof instead and ignores the Justification (can be None)
        """
        if isinstance(self.argument,Proof):
            return self.argument.checkValidity()
        else:
            return self.justification.checkValidity()
    
    def applyRule(self) -> Expression|None:
        """
        Checks to see if the active Justification is valid, and if it is it applies the Rule to form a new Expression.
        Otherwise it returns None.
        """
        if self.justification.checkValidity():
            return self.justification.rule.apply(self.argument)
        else:
            return None