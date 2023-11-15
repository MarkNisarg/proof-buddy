from proofs.LineNumber import LineNumber
from proofs.Expression import Expression
from proofs.Justification import Justification

class ProofLine:
    def __init__(self, line_no=None, argument=None, justification=None):
        if isinstance(line_no,LineNumber):
            self.line_number = line_no
        else:
            print('error')

        if isinstance(argument,Expression):
            self.argument = argument
        else:
            print('error')

        if isinstance(justification,Justification):
            self.justification = justification
        else:
            print('error')

    # Should not be set explicitly, but rather this method be called when indented
    #  or otherwise out of sync. It should be valid from creation
    def updateLineNo(self):
        pass

    def setArgument(self, argument=None):
        pass

    def setJustification(self, justification=None):
        pass