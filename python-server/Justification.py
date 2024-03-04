from __future__ import annotations
from Proof import Proof
from Rule import Rule
from Expression import Expression

class Justification:
    """
    Holds a Rule object and a list of line numbers and facilitates checking the application of the rule against
    the applicable expressions.
    """
    def __init__(self, parentProof:Proof, rule:Rule, references:list[list[int]]):
        self.proof = parentProof
        self.rule = rule
        self.references = references

    def checkValidity(self) -> bool:
        """
        Calls the containing Rule's canApply method passing it the expressions for the referenced premises
        and active expression to be converted to the conclusion.
        """
        premises = list[Expression]()
        if len(self.rule.premises) > 1:
            for ln in self.references:
                premises.append(self.proof.getLine(ln).argument)
        else:
            premises.append(self.proof.getLine(self.references).argument)
        return self.rule.canApply(premises)
    
    def __repr__(self) -> str:
        """
        For recreating this object calling the constructor method for debugging
        """
        class_name = type(self).__name__
        return f'{class_name}({self.rule!r},{self.references!r})'
    
    def __format__(self, __format_spec: str) -> str:
        """
        For printing out as a string with special formatting such as Latex.
        """
        raise NotImplementedError
    
    def __str__(self) -> str:
        """
        For printing out 'normally' (without special formatting like Latex), likely for debugging
        """
        s = f'{self.rule}'
        for r in self.references:
            rs = r[0]
            for l in range(len(r)-1):
                rs += f'.{r[l+1]}'
            s += f' {rs}'
        return s