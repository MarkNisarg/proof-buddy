from Proof import Proof
from GUID import GUID

class Rule(Proof):
    """
    A Rule object extends Proof by allowing it to be applied as a Justification to a ProofLine.
    To apply a Rule, the ProofEngine needs to check the Rule's premises against its referenced
    prior lines, and the Rule's conclusion against the active subexpression in the current line.
    Then, it must recursively call a validity check on the Rule's Proof which will also check any
    containing subproofs.
    """
    def __init__(self, proof:Proof):
        # Basically, if the proof is valid, copy all fields to a Rule object
        # (or maybe type cast) from proof and add additional fields as necessary
        if isinstance(proof,Proof):
            if proof.isValid() & proof.isComplete():
                self.premises = proof.premises
                self.conclusion = proof.conclusion
                self.content = proof.content
                self.title = proof.title
                self.id = GUID('Rule',proof.id)
            else:
                print('Error')
        else:
            print('Error')
