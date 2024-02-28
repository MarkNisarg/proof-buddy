from Token import Token, TokenIdentifier
from Expression import Expression, ExpressionIdentifier
import re
from copy import deepcopy

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
        try:
            while len(working_line) > 0:
                old_working_line = deepcopy(working_line)
                for t in self.tokenIDs:
                    whitespace = re.compile(r'(\s*)').match(working_line)
                    working_line = working_line[len(whitespace.group(0)):]
                    match, rest_of_line = t.match(working_line)
                    if match != None:
                        tokens.append(match)
                        working_line = rest_of_line
                        break
                if working_line == old_working_line:
                    raise FileNotFoundError()
                del old_working_line
        except Exception as e:
            invalid_token = working_line
            for t in self.tokenIDs:
                match = t.recognizeRegex.search(working_line)
                if match != None:
                    invalid_token = invalid_token[:match.start()]
            print(f"ERROR: invalid parsing '{invalid_token}'")
            raise FileNotFoundError()
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
        working_EIs = self.expressionIDs[0:len(self.expressionIDs)-1]
        any_EI = self.expressionIDs[len(self.expressionIDs)-1]
        while len(tokenList) > 1:
            old_tokenList = deepcopy(tokenList)
            hasMatch = False
            for e in working_EIs:
                offset = 0
                while offset < len(tokenList):
                    match, rest_of_list = e.match(tokenList[offset:len(tokenList)])
                    if match != None:
                        # If match is found, construct new list and start again
                        tokenList = tokenList[0:offset] + [match] + rest_of_list
                        hasMatch = True
                        break
                    else:
                        offset += 1
                if hasMatch:
                    break
            if tokenList == old_tokenList:
                expr_list = [e.id.name for e in tokenList]
                print(f'ERROR: Ill formed expression: {expr_list}')
                raise FileNotFoundError()
            del old_tokenList
        return tokenList[0]

    def addTokenIdentifier(self, tokenIdentifier:TokenIdentifier) -> None:
        self.tokenIDs.append(tokenIdentifier)

    def addExpressionType(self, name:str, structure:list[TokenIdentifier]) -> None:
        self.expressionIDs.append(structure)
