from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier
import re


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
    def __init__(self, tokenIdentifiers: list[TokenIdentifier], expressionTypes: list[ExpressionIdentifier]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionTypes

    def tokenize(self, inputLine:str) -> list[Token]:
        tokens = list[Token]()
        cursor = 0
        while cursor < len(inputLine):
            for t in self.tokenIdentifiers:
                regex = re.compile(t.recognizeRegex)
                match = regex.match(inputLine, cursor)
                if match != None:
                    cursor += len(match.group(0))
                    tokens.append(Token(t,match))
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> tuple[Expression,list[Token|Expression]]:
        # tokenize str->list[Token]
        # Match list[Token] to list[ExpressionType] (recursively) to create Expression tree
        tokenList = list(self.tokenize(inputLine))
        for t_i, t in enumerate(tokenList):
            if t.isTerminal:
                if debug:
                    print(f'{t.tokenIdentifier.name}: {t}')
                    print()
                tokenList[t_i] = Expression(ExpressionIdentifier(t.tokenIdentifier.name, [t.tokenIdentifier]), f'{t}')
        while len(tokenList) > 1:
            for e in self.expressionTypes:
                found, new_list = e.match(tokenList)
                if found != None:
                    tokenList = new_list
                    break
        return tokenList[0]

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier):
        self.tokenIdentifiers.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]):
        self.expressionTypes.append(structure)
