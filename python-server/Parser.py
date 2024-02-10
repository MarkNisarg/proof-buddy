from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier
import re


class Parser:

    def __init__(self, tokenIdentifiers: list[TokenIdentifier], expressionTypes: list[ExpressionIdentifier]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionTypes

    def tokenize(self, inputLine:str) -> list[Token]:
        tokens = list[Token]
        cursor = 0
        while cursor < len(inputLine):
            for t in self.tokenIdentifiers:
                regex = re.compile(t.recognizeRegex)
                match = regex.match(inputLine, cursor)
                if match != None:
                    cursor += len(match.group(0))
                    tokens.append(Token(t,match))
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> Expression:
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
                found, index = e.match(tokenList)
                if found:
                    if debug:
                        print(f'{e.name}: {tokenList[index:index+len(e.structure)]!s}')
                    new_expr = Expression(e, tokenList[index:index+len(e.structure)])
                    # I couldn't figure out how to pass a slice to __delitem__ for some reason
                    # It should support it
                    for i in range(len(e.structure)):
                        tokenList.__delitem__(index)
                    tokenList.insert(index, new_expr)
                    break
        return tokenList[0]

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier):
        self.tokenIdentifiers.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]):
        self.expressionTypes.append(structure)
