import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)
from Token import Token, TokenType
from Expression import Expression, ExpressionIdentifier
import Parser

# class ParserTestInstance(NamedTuple):
#     expressionType: ExpressionType
#     valid_unparsed: list[list[Token | Expression]]
#     valid_parsed: list[list[Expression]]
#     invalid_unparsed: list[list[Token | Expression]]

def defineER():
    tNumber = TokenType('Number',r'\d+','\g<1>')
    tTrue = TokenType('True',r'#t','#t')
    tFalse = TokenType('False',r'#f','#f')
    tSymbol = TokenType('Symbol',r'[A-Z]','\g<1>')
    tPlus = TokenType('Plus',r'\+','+')
    tMinus = TokenType('Minus',r'-','-')
    tTimes = TokenType('Times',r'\*','*')
    tLambda = TokenType('Lambda',r'λ','λ')
    tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
    tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
    tokenList = [tNumber,tTrue,tFalse,tSymbol,tPlus,tMinus,tTimes,tLambda,tOpenParens,tClosedParens]

    eExpression = TokenType.getGeneric('Expression')
    # eInteger = ExpressionType('Integer',TList(TokenType,[tNumber]))
    eBoolean1 = ExpressionIdentifier('Boolean',[tTrue])
    eBoolean2 = ExpressionIdentifier('Boolean',[tFalse])
    eTerminal = ExpressionIdentifier('Terminal',[tSymbol])
    # For ER, parentheses are necessarily part of every expression and not a wrapper
    eAdd = ExpressionIdentifier('Add',[tOpenParens,tPlus,tNumber,tNumber,tClosedParens])
    expressionList = [eExpression, eBoolean1, eBoolean2, eTerminal, eAdd]
    return tokenList, expressionList

class ParserTests(unittest.TestCase):
    def setUp(self):
        tokenList, expressionList = defineER()
        self.paser = Parser(tokenList, expressionList)
    #     tTrue = TokenType('True',r'#t','#t')
    #     tokenTrue = tTrue.parse('#t')
    #     tSymbol = TokenType('Symbol',r'([A-Z])',r'\g<1>')
    #     tokenSymbol = tSymbol.parse('A')
    #     eTerminal = ExpressionType('Terminal',[tSymbol])
    #     eBoolean = ExpressionType('Boolean',[tTrue])
    #     self.expressionTypeList = list[ExpressionTestInstance]()
    #     self.expressionTypeList.append(ExpressionTestInstance(
    #         eBoolean,
    #         [
    #             [tokenTrue]
    #         ],[
    #             Expression(eBoolean, [tokenTrue])
    #         ],
    #         [
    #             [Expression(eTerminal, [tokenSymbol])],
    #             []
    #         ])
    #     )

    def test_parser_tokenize_valid(self):
        valid_unparsed = list[str]()
        valid_parsed = list[[Token]]()
        tSymbol = TokenType('Symbol', r'[A-Z]', '\g<1>')
        tPlus = TokenType('Plus', r'\+', '+')
        valid_unparsed.append('A+B')
        valid_parsed.append([Token(tSymbol, 'A'), Token(tPlus, '+'), Token(tSymbol, 'B')])
    def test_parser_tokenize_invalid(self):
        pass

    def test_parser_parse_valid(self):
        pass

    def test_parser_parse_invalid(self):
        pass


if __name__ == '__main__':
    unittest.main()
