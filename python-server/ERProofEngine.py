from ProofEngine import ProofEngine
from Expression import Expression, ExpressionIdentifier
from Token import TokenIdentifier
from ERType import ERType
from Rule import Rule
from Proof import Proof
from Justification import Justification
from ProofLine import ProofLine

class ERProofEngine(ProofEngine):
    """
    Extends ProofEngine to add types to Expressions and methods that apply to dealing with types
    """
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier],
                 knownRules:list[Rule], knownProofs:list[Proof], knownTypes:list[ERType]):
        super().__init__(tokenIdentifiers,expressionIdentifiers,knownRules,knownProofs)
        if knownTypes != None:
            self.knownTypes = knownTypes
        else:
            self.knownTypes = list[ERType]()

    def parseExpression(self, expressionString: str) -> Expression:
        """
        Given an expression string, parses it into an Expression object, then assigns a type to it.
        """
        expression = super().parseExpression(expressionString)
        return self.labelExpression(expression)

    def getType(self, typeName:str) -> ERType|None:
        """
        Looks up a type by name in the list of known ERTypes.
        """
        for t in self.knownTypes:
            if t.name == typeName:
                return t
        return None
    
    def createType(self, name:str, type_definition:str) -> bool:
        """
        Attempts to create a new type with the given name and given type definition and adds it to the list
        of known types.
        """
        raise NotImplementedError
    
    def labelExpression(self, expression:Expression) -> Expression:
        """
        Performs a second pass on the parsed expression object and labels subexpressions as different types.
        """
        raise NotImplementedError
    
    def evaluateExpressionString(self, expressionString:str) -> Expression:
        """
        Evaluates the expression from the given string and returns the expression that it evaluates to.
        """
        expression = self.parser.parse(expressionString)
        return expression.evaluate()

    def saveProof(self, name:str, proofLines:list[tuple[str,tuple[str,list[list[int]]]]]) -> None:
        """
        Given a structured field containing strings and ints from the frontend, constructs a Proof object
        and adds it to the known proofs array. Overwritten to add type support.
        """
        new_proof = Proof(name)
        for i,pl in enumerate(proofLines):
            argument = self.parser.parse(pl[0])
            argument = self.labelExpression(argument)
            rule = self.getRule(pl[1][0])
            rule_premises = pl[1][1]
            justification = Justification(rule, rule_premises)
            proofLine = ProofLine(new_proof,i,argument,justification)
            new_proof.addLine(proofLine)
        self.knownProofs.append(new_proof)
    
    def addLineToProof(self, proofName:str, argument:str, ruleName:str, references:list[int]) -> None:
        """
        Given strings representing a proof name, an expression, a rule name, and a list of ints for references,
        creates a ProofLine object and adds it to the proof with that name. Overwritten to add type support.
        """
        # Look up Proof object by name
        proof = self.getProof(proofName)
        # Parse expression
        expr = self.parser.parse(argument)
        # Assign a type
        expr = self.labelExpression(expr)
        # Look up Rule object by name
        rule = self.getRule(ruleName)
        # Create Justification object
        justification = Justification(rule,references)
        # Create ProofLine object
        proofLine = ProofLine(proof, 0, expr, justification)
        # Add it to the existing Proof
        proof.addLine(proofLine)
