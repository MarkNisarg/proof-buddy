from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier
import re
from copy import deepcopy

class Parser:

    def __init__(self, tokenIdentifiers: list[TokenIdentifier], expressionTypes: list[ExpressionIdentifier]):
        self.tokenIdentifiers = tokenIdentifiers
        self.expressionTypes = expressionTypes

    def tokenize(self, inputLine:str, debug:bool) -> list[Token]:
        tokens = list[Token]()
        cursor = 0
        while cursor < len(inputLine):
            for t in self.tokenIdentifiers:
                # join all the regex patterns into one pattern for matching
                regex = re.compile(t.recognizeRegex)
                match = regex.match(inputLine, cursor)
                if match != None:
                    cursor += len(match.group(0))
                    # create Token to hold raw list of strings instead of needing to work with Match objects
                    tokens.append(Token(t,match,t.printRegex))
        return tokens

    def parse(self, inputLine:str, debug:bool=False) -> Expression:
        # tokenize str->list[Token]
        # Match list[Token] to list[ExpressionType] (recursively) to create Expression tree
        inputLine = inputLine.replace(' ','')
        tokenList = self.tokenize(inputLine, debug)
        #print('tokens: ', tokenList) # print tokenized input string
        for t_i, t in enumerate(tokenList):
            if t.isTerminal:
                if debug:
                    print(f'{t.id.name}: {t}')
                    print()
                tokenList[t_i] = Expression(ExpressionIdentifier(t.id.name, [[t.id]]), [f'{t}'])
        return self.getExpressions(tokenList)[0]

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier):
        self.tokenIdentifiers.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]):
        self.expressionTypes.append(structure)

    def getExpressions(self, tokenList):
        if len(tokenList) == 0:
            return [Expression(None, [])]
        while len(tokenList) > 1:
            # make a single pass through all the different identifiers
            for e in self.expressionTypes:
                # match() returns a list or a single expression now
                if e.name == 'List' and str(tokenList[0]) == '(':
                    innerExp = self.getExpressions(tokenList[1:-1])
                    tokenList = e.match([tokenList[0]] + innerExp + [tokenList[-1]])
                else:
                    tokenList = e.match(tokenList)
                while sum(1 for t in tokenList if isinstance(t, Expression)) > 1:
                    for i in range(len(tokenList)-1):
                        if isinstance(tokenList[i], Expression) and isinstance(tokenList[i+1], Expression):
                            tokenList = tokenList[0:i] + [Expression(None, tokenList[i].components + tokenList[i+1].components)] + tokenList[i+2:len(tokenList)]
                            break
        return tokenList
