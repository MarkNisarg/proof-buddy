from Token import TokenIdentifier
from Expression import ExpressionIdentifier, Expression
from Parser import Parser
from Proof import Proof
from Rule import Rule
from Justification import Justification
from ProofLine import ProofLine

class ProofEngine():
    """
    Handles all Proof related functions requested by app.py from the frontend, such as applying rules, creating
    rules and checking proofs.
    """
    def __init__(self, tokenIdentifiers:list[TokenIdentifier], expressionIdentifiers:list[ExpressionIdentifier],
                 knownRules:list[Rule], knownProofs:list[Proof]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionIdentifiers
        self.parser = Parser(tokenIdentifiers,expressionIdentifiers,None)
        
        if knownRules != None:
            self.knownRules = knownRules
        else:
            self.knownRules = list[Rule]()

        if knownProofs != None:
            self.knownProofs = knownProofs
        else:
            self.knownProofs = list[Proof]()

    def generateRacketFromRule(self, rule:str):
        return 'successful'
    
    def parseExpression(self, expressionString:str) -> Expression:
        """
        Given the expression string, returns the parsed Expression object that corresponds to it.
        """
        return self.parser.parse(expressionString)
    
    def getRule(self,ruleName:str) -> Rule|None:
        """
        Looks up a rule by its name and returns the Rule object
        """
        for r in self.knownRules:
            if r.name == ruleName:
                return r
        return None

    def applyRule(self, expression:str, rulePremises:list[str], ruleName:str) -> str:
        """
        Looks up a rule by name, parses the expression, and attempts to apply the rule directly to the expression
        given the list of premises that it also has to parse. This works on single Expressions instead of whole
        proof objects.
        """
        # Parse expression rule should apply to
        expr = self.parser.parse(expression)
        # Parse each premise that should allow us to apply the rule according to its proof
        premises = list[Expression]()
        for x in rulePremises:
            premises.append(self.parser.parse(x))
        # Look up rule object in known rules
        rule = self.getRule(ruleName)
        # Check if it applies and apply
        if rule.canApply(premises):
            output = rule.apply(expr)
            return output
        else:
            return f"Error. Cannot apply rule: {rule.name}"
    
    def canApplyRule(self, rulePremises:list[str], ruleName:str) -> bool:
        """
        Checks to see if a rule object (looked up by name)
        """
        # Parse each of the premises of the rule
        premises = list[Expression]()
        for x in rulePremises:
            premises.append(self.parser.parse(x))
        # Look up the rule
        rule = self.getRule(ruleName)
        # Apply it
        return rule.canApply(premises)
    
    def saveProof(self, name:str, proofLines:list[tuple[str,tuple[str,list[list[int]]]]]) -> None:
        """
        Given a structured field containing strings and ints from the frontend, constructs a Proof object
        and adds it to the known proofs array.
        """
        new_proof = Proof(name)
        for i,pl in enumerate(proofLines):
            argument = self.parser.parse(pl[0])
            rule = self.getRule(pl[1][0])
            rule_premises = pl[1][1]
            justification = Justification(rule, rule_premises)
            proofLine = ProofLine(new_proof,i,argument,justification)
            new_proof.addLine(proofLine)
        self.knownProofs.append(new_proof)
    
    def getProof(self, proofName:str) -> Proof|None:
        """
        Looks up the proof by name and returns it as a Proof object
        """
        for p in self.knownProofs:
            if p.name == proofName:
                return p
        return None

    def checkProof(self, proofName:str) -> bool:
        """
        Looks up a proof by name and checks to see if it's valid
        """
        proof = self.getProof(proofName)
        return proof.checkValidity()
    
    def addLineToProof(self, proofName:str, argument:str, ruleName:str, references:list[int]) -> None:
        """
        Given strings representing a proof name, an expression, a rule name, and a list of ints for references,
        creates a ProofLine object and adds it to the proof with that name
        """
        # Look up Proof object by name
        proof = self.getProof(proofName)
        # Parse expression
        expr = self.parser.parse(argument)
        # Look up Rule object by name
        rule = self.getRule(ruleName)
        # Create Justification object
        justification = Justification(rule,references)
        # Create ProofLine object
        proofLine = ProofLine(proof, 0, expr, justification)
        # Add it to the existing Proof
        proof.addLine(proofLine)
    
    def createRule(self, proofName:str) -> bool:
        """
        Looks up a Proof object by name, checks to see if its valid, attempts to create a Rule object out of it
        and appends it to the known list of Rules
        """
        proof = self.getProof(proofName)
        if not proof.checkValidity():
            return False
        else:
            new_rule = Rule(proof)
            self.knownRules.append(new_rule)
            return True