from Token import Token, TokenType
from Expression import Expression, ExpressionType
import re


class Parser:

    def __init__(self, tokenTypes: list[TokenType], expressionTypes: list[ExpressionType]):
        self.tokenTypes = tokenTypes
        self.expressionTypes = expressionTypes

    def tokenize(self, inputLine:str) -> list[Token]:
        tokens = list[Token]
        cursor = 0
        while cursor < len(inputLine):
            for t in self.tokenTypes:
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
                    print(f'{t.tokenType.name}: {t}')
                    print()
                tokenList[t_i] = Expression(ExpressionType(t.tokenType.name, [t.tokenType]), f'{t}')
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

    def addTokenType(self, tokenType:TokenType):
        self.tokenTypes.append(tokenType)

    def addExpressionType(self, name:str, structure:list[TokenType]):
        self.expressionTypes.append(structure)
