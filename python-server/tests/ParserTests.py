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
            '({token} {token})',
            '(({token}){token})',
            '(({token}) {token})',
            '(({token})({token}))',
            '({token}     {token})',
        ]

        self.invalid_templates = [
            '({token}{token})',
            '(#x)',
            '({token})({token})',
            '(##t)',
            '(#tt)',
            '(#)',
            '(t)',
            '({token}',
            '{token})',
        ]

        tTrue = self.TIs[3]
        tOpenParen = self.TIs[0]
        tCloseParen = self.TIs[1]
        eBool = self.EIs[1]
        eList = self.EIs[3]
        trueToken = Token(tTrue, None)
        trueBoolVar = Expression(eBool, [trueToken])
        openVar = Token(tOpenParen, None)
        closeVar = Token(tCloseParen, None)


        listVar = Expression(eList, [openVar,trueBoolVar,closeVar])

        self.valid_comp_list = [listVar, listVar, trueToken, listVar, listVar, listVar, listVar, listVar, listVar]
    

    def test_parser_parse_valid(self):
        for token in self.tokens:
            for idx, val_temp in enumerate(self.valid_templates):
                try:
                    test = fstr(val_temp, token)
                    print(f'Test {idx+1}: {test}')
                    test_expr = self.EREngine.parse_expression(test)
                    # tTrue = self.TIs[3]
                    # tOpenParen = self.TIs[0]
                    # tCloseParen = self.TIs[1]
                    # eBool = self.EIs[1]
                    # eList = self.EIs[3]
                    # boolVar = Expression(eBool, [Token(tTrue, None)])
                    # openVar = Token(tOpenParen, None)
                    # closeVar = Token(tCloseParen, None)
                    # listVar = Expression(eList, [openVar,boolVar,closeVar])
                    self.assertEqual(test_expr, self.valid_comp_list[idx])
                except Exception as e:
                    print(e)
                    

if __name__ == '__main__':
    unittest.main()
