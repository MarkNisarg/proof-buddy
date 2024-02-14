from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier
import re


class Parser:

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
