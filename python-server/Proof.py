from __future__ import annotations
from Rule import Rule
from ProofLine import ProofLine
from Expression import Expression
from GUID import GUID

# The Proof class will contain all the fields that a proof will need to know to pass along API calls.
# It will only store the information however and will call the necessary methods for parsing and
# validation from other classes so that multiple proof engines can be used.

# We might want to store both the initiial raw strings that the user entered, as well as the parsed
# expressions separately and have them fill out each other as needed

class Proof:
    """
    Holds an array of ProofLines each containing an Expression object and a Justification object.
    The proof is checked by calling checkValidity which checks the validity of each line. Only the Rule
    objects in the allowed_rules list may be used in this Proof and the premises and conclusions must exist
    in the body of the proof with premises having the premise justification and the conclusion being the last
    line.
    """
    def __init__(self):
        self.premises : list[Expression] = None
        self.conclusion : Expression = None
        self.allowed_rules : list[Rule] = None
        self.content : list[ProofLine] = None
        self.isValid = False
        self.isComplete = False
        self.name = ''
        self.id = GUID('proof')

    def prependLineNumber(self, parentProofLine:list[int]) -> None:
        """
        Called when adding this proof to a parent proof in order to prepend all of this proof's line numbers
        with the line number that this proof is on in the parent proof.
        """
        for pl in self.content:
            pl.line_no = parentProofLine + pl.line_no

    def addLine(self, proofLine:ProofLine):
        """
        Adds a new ProofLine to the current Proof body
        """
        if len(self.content) == 0:
            proofLine.line_no = 1
        else:
            lastLine = self.content[len(self.content)-1]
            proofLine.line_no = ProofLine.getNextLineNumber(lastLine.line_no)
        self.content += proofLine

    def checkValidity(self):
        """
        Checks if the proof is valid by calling checks on each ProofLine against each Justification
        """
        for pl in self.content:
            if not pl.checkValidity():
                return False
        return True

    def checkComplete(self):
        return self.checkValidity() & self.checkPremises() & self.checkConclusion()

    def checkPremises(self):
        """
        Checks to see if the premises are mentioned in the body of the proof with the premise justification
        """
        pass

    def checkConclusion(self):
        """
        Checks if the last line in the body matches the conclusion expression
        """
        return self.conclusion == self.content[-1].argument
    
    def getLine(self, lineNo:list[int]) -> ProofLine:
        """
        Given a line number, which may be a single int or a list of ints (nested proofs), return the corresponding
        ProofLine.
        """
        raise NotImplementedError
    
    def __format__(self, __format_spec: str) -> str:
        """
        Allows us to print the proof out as a string in different formats, ie in Latex if we wanted to.
        """
        raise NotImplementedError

    def __str__(self):
        """
        Prints the Proof out in the 'normal' way (ie not Latex or whatever). Most likely for debugging.
        """
        raise NotImplementedError