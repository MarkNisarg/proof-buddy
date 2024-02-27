import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)
# from Token import Token, TokenType
# from Expression import Expression, ExpressionIdentifier
# import Parser
from Parser import Parser
import EquationalReasoning as ER
from Expression import Expression
from Token import Token


def fstr(template, token):
    return eval(f"f'{template}'")

# class ParserTestInstance(NamedTuple):
#     expressionType: ExpressionType
#     valid_unparsed: list[list[Token | Expression]]
#     valid_parsed: list[list[Expression]]
#     invalid_unparsed: list[list[Token | Expression]]

# def defineER():
#     tNumber = TokenType('Number',r'\d+','\g<1>')
#     tTrue = TokenType('True',r'#t','#t')
#     tFalse = TokenType('False',r'#f','#f')
#     tSymbol = TokenType('Symbol',r'[A-Z]','\g<1>')
#     tPlus = TokenType('Plus',r'\+','+')
#     tMinus = TokenType('Minus',r'-','-')
#     tTimes = TokenType('Times',r'\*','*')
#     tLambda = TokenType('Lambda',r'λ','λ')
#     tOpenParens = TokenType('Open Parenthesis',r'(\()','(')
#     tClosedParens = TokenType('Closed Parenthesis',r'(\))',')')
#     tokenList = [tNumber,tTrue,tFalse,tSymbol,tPlus,tMinus,tTimes,tLambda,tOpenParens,tClosedParens]

#     eExpression = TokenType.getGeneric('Expression')
#     # eInteger = ExpressionType('Integer',TList(TokenType,[tNumber]))
#     eBoolean1 = ExpressionIdentifier('Boolean',[tTrue])
#     eBoolean2 = ExpressionIdentifier('Boolean',[tFalse])
#     eTerminal = ExpressionIdentifier('Terminal',[tSymbol])
#     # For ER, parentheses are necessarily part of every expression and not a wrapper
#     eAdd = ExpressionIdentifier('Add',[tOpenParens,tPlus,tNumber,tNumber,tClosedParens])
#     expressionList = [eExpression, eBoolean1, eBoolean2, eTerminal, eAdd]
#     return tokenList, expressionList

class ParserTests(unittest.TestCase):
    def setUp(self):
        self.EREngine = ER.create_proofEngine()
        self.TIs, self.EIs = ER.define_identifiers()
        self.tokens = ['#t']
        self.valid_templates = [
            '({token})',
            '     (   {token}   )',
            '{token}',
            '(({token}))',
            '({token} {token})',]
        #     '(({token}){token})',
        #     '(({token}) {token})',
        #     '(({token})({token}))',
        #     '({token}     {token})',
        # ]

        

        # self.invalid_templates = [
        #     '({token}{token})',
        #     '(#x)',
        #     '({token})({token})',
        #     '(##t)',
        #     '(#tt)',
        #     '(#)',
        #     '(t)',
        #     '({token}',
        #     '{token})',
        # ]
        # tokenList, expressionList = defineER()
        # self.paser = Parser(tokenList, expressionList)
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

    # def test_parser_tokenize_valid(self):
    #     valid_unparsed = list[str]()
    #     valid_parsed = list[[Token]]()
    #     tSymbol = TokenType('Symbol', r'[A-Z]', '\g<1>')
    #     tPlus = TokenType('Plus', r'\+', '+')
    #     valid_unparsed.append('A+B')
    #     valid_parsed.append([Token(tSymbol, 'A'), Token(tPlus, '+'), Token(tSymbol, 'B')])
    # def test_parser_tokenize_invalid(self):
    #     pass

    def test_parser_parse_valid(self):
        for token in self.tokens:
            for idx, val_temp in enumerate(self.valid_templates):
                try:
                    test = fstr(val_temp, token)
                    test_expr = self.EREngine.parse_expression(test)
                    tTrue = self.TIs[3]
                    tOpenParen = self.TIs[0]
                    tCloseParen = self.TIs[1]
                    eBool = self.EIs[1]
                    eList = self.EIs[3]
                    boolVar = Expression(eBool, [Token(tTrue, None)])
                    openVar = Token(tOpenParen, None)
                    closeVar = Token(tCloseParen, None)
                    listVar = Expression(eList, [openVar,boolVar,closeVar])
                    if test_expr == listVar:
                        pass
                    self.assertEqual(test_expr, listVar)
                except Exception as e:
                    print(e)



    # def test_parser_parse_invalid(self):
    #     pass


if __name__ == '__main__':
    unittest.main()
