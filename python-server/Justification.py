import LineNumber
from Rule import Rule
from TList import TList

# This should essentially just be a reference to a Rule, from the allowed rule list, and the line numbers
# that correspond to the premises of that rule's proof
class Justification:
    """
    The Justification class is a helper container class that contains a Rule object, and a list of numbers
    that refer to the location of the corresponding premises of the Rule object. This class will need a
    method to check that the line numbers match the premises of the Rule, and then call the Rule's validity
    check which will in turn check its containing Proof.
    """
    def __init__(self, rule:Rule=Rule(), references:TList=TList(LineNumber,[])):
        if rule and not isinstance(rule,Rule):
            print('error')
        else:
            self.rule = rule

        if references and (not isinstance(references,TList) or not references.T==LineNumber):
            print('Error')
        else:
            self.references = references
    
    def __repr__(self):
        class_name = type(self).__name__
        return f'{class_name}({self.rule!r},{self.references!r})'
    
    def __str__(self):
        s = f'{self.rule}'
        for r in self.references:
            s += f' {r}'
        return s