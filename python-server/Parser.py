from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier

class Parser:
    """
    The Parser class is used to construct a single Expression tree structure from the original input
    string that the user enters on the frontend. This Expression object is then passed back to the
    ProofEngine that called it for it to then handle the application of Rules etc. The 'language'
    is defined as a list of ExpressionIdentifiers and TokenIdentifiers that the ProofEngine will pass
    to the Parser upon construction. The TokenIdentifiers instruct the Parser how to recognize sections
    of the input string as Tokens within the tokenize method, and ExpressionIdentifiers instruct it how
    to turn this sequence of Tokens (or possibly subcontaining Expression objects) into yet larger Expression
    objects in the parse method. If it cannot parse the string successfully, it should throw some error that
    can be sent back to the ProofEngine, and then to the frontend to inform the user.
    """
    def __init__(self, tokenIDs: list[TokenIdentifier], expressionIDs: list[ExpressionIdentifier]):
        self.tokenIDs = tokenIDs
        self.expressionIDs = expressionIDs

    def tokenize(self, inputLine:str) -> list[Token]:
        tokens = list[Token]()
        working_line = inputLine
        while len(working_line) > 0:
            for t in self.tokenIDs:
                match, rest_of_line = t.match(working_line)
                if match != None:
                    tokens.append(match)
                    working_line = rest_of_line
                    break
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> Expression:
        # tokenize str->list[Token]
        # Match list[Token] to list[ExpressionType] (recursively) to create Expression tree
        tokenList = self.tokenize(inputLine)
        # Before checking expressions, wrap all terminal Tokens in Expressions
        for t in tokenList:
            if t.isTerminal:
                if debug:
                    print(f'{t.id.name}: {t}')
                    print()
                t = Expression(ExpressionIdentifier(t.id.name, [t.id]), [t])
        # Check all EIs against the list of Token|Expressions until it only contains a single node
        # The outermost Expression
        while len(tokenList) > 1:
            for i in range(len(tokenList)):
                hasMatch = False
                for e in self.expressionIDs:
                    match, rest_of_list = e.match(tokenList[i:len(tokenList)])
                    if match != None:
                        # If match is found, construct new list and start again
                        tokenList = tokenList[0:i] + [match] + rest_of_list
                        hasMatch = True
                        break
                # Break both loops and start checking first position again
                if hasMatch:
                    break
        return tokenList[0]

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier) -> None:
        self.tokenIDs.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]) -> None:
        self.expressionIDs.append(structure)
