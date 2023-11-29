import LineNumber
from Rule import Rule
from TList import TList

class Justification:
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