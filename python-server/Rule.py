from Proof import Proof
from GUID import GUID

class Rule(Proof):
    def __init__(self, proof:Proof):
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
