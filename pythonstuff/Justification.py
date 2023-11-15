import Rule, LineNumber

class Justification:
    def __init__(self, rule=Rule(), references=[]):
        self.rule = rule
        self.references = []
        for r in references:
            if isinstance(r, LineNumber):
                self.references.append(r)
    
    def __repr__(self):
        class_name = type(self).__name__
        return f'{class_name}({self.rule!r},{self.references!r})'
    
    def __str__(self):
        s = f'{self.rule}'
        for r in self.references:
            s += f' {r}'
        return s