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
                # join all the regex patterns into one pattern for matching
                regex = re.compile('|'.join(t.recognizeRegex))
                match = regex.match(inputLine, cursor)
                if match != None:
                    cursor += len(match.group(0))
                    # create Token to hold raw list of strings instead of needing to work with Match objects
                    tokens.append(Token(t,list(match.group(0))))
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> Expression|str:
        # tokenize str->list[Token]
        # Match list[Token] to list[ExpressionType] (recursively) to create Expression tree
        tokenList = self.tokenize(inputLine)
        # print('tokens: ', tokenList) # print tokenized input string
        for t_i, t in enumerate(tokenList):
            if t.isTerminal:
                if debug:
                    print(f'{t.id.name}: {t}')
                    print()
                tokenList[t_i] = Expression(ExpressionIdentifier(t.id.name, [[t.id]]), [f'{t}'])
        # while len(tokenList) > 1:
        # make a single pass through all the different identifiers
        for e in self.expressionTypes:
            # match() returns a list or a single expression now
            new_list = e.match(tokenList)
            tokenList = new_list
            if len(tokenList) == 1:
                # return the final expression object
                return tokenList[0]
        # print('incomplete ',tokenList) # print error message and debug information
        return 'incomplete parsing'

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier):
        self.tokenIdentifiers.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]):
        self.expressionTypes.append(structure)
