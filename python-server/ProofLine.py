from LineNumber import LineNumber
from Expression import Expression
from Justification import Justification
from Proof import Proof

class ProofLine:
    """
    The ProofLine class is just a helper container class that holds an Expression object and a
    Justification object (containing a Rule and reference line numbers). This will help the Proof
    facilitate validation checks between lines of Expressions to ensure the entire Proof is valid.
    """
    def __init__(self, line_no:LineNumber=LineNumber(), argument:Expression=Expression(), justification:Justification=Justification()):
        # This should probably be replaced with a single int and the string
        # representation just be constructed from the layering of subproofs
        if line_no and not isinstance(line_no,LineNumber):
            print('error')
        else:
            self.line_number = line_no

        if argument and not (isinstance(argument,Expression) or isinstance(argument,'Proof')):
            print('error')
        else:
            self.argument = argument

        if justification and not isinstance(justification,Justification):
            print('error')
        else:
            self.justification = justification

    # Should not be set explicitly, but rather this method be called when indented
    #  or otherwise out of sync. It should be valid from creation
    def updateLineNo(self):
        pass

    def setArgument(self, argument:Expression):
        if isinstance(argument,Expression):
            self.argument = argument
        else:
            print('Error')

    def setJustification(self, justification:Justification):
        if isinstance(justification,Justification):
            self.justification = justification
        else:
            print('Error')
    
    def parseArgument(self, argument:str):
        pass