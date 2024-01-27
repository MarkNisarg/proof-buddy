import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)

from Expression import Expression, ExpressionType
from Token import Token, TokenIdentifier

class ExpressionTestInstance(NamedTuple):
    expressionType: ExpressionType
    valid_unparsed: list[list[Token | Expression]]
    valid_parsed: list[list[Expression]]
    invalid_unparsed: list[list[Token | Expression]]

class ExpressionTests(unittest.TestCase):
    def setUp(self):    
        tTrue = TokenIdentifier('True',r'#t','#t')
        tokenTrue = tTrue.parse('#t')
        tSymbol = TokenIdentifier('Symbol',r'([A-Z])',r'\g<1>')
        tokenSymbol = tSymbol.parse('A')
        eTerminal = ExpressionType('Terminal',[tSymbol])
        eBoolean = ExpressionType('Boolean',[tTrue])
        self.expressionTypeList = list[ExpressionTestInstance]()
        self.expressionTypeList.append(ExpressionTestInstance(
            eBoolean,
            [
                [tokenTrue]
            ],[
                Expression(eBoolean, [tokenTrue])
            ],
            [
                [Expression(eTerminal, [tokenSymbol])], 
                []
            ])
        )

    def test_expressiontype_parse_valid_list_of_tokens(self):
        for ti in self.expressionTypeList:
            with self.subTest(ti.expressionType.name):
                for s in ti.valid_unparsed:
                    expression = ti.expressionType.match(s)
                    self.assertIsNotNone(expression)
    
    def test_expressiontype_parse_invalid_list_of_tokens(self):
         for ti in self.expressionTypeList:
            with self.subTest(ti.expressionType.name):
                for s in ti.invalid_unparsed:
                    expression = ti.expressionType.match(s)
                    self.assertIsNone(expression)

    def test_expression_print_valid(self):
        for ti in self.expressionTypeList:
            with self.subTest(ti.expressionType.name):
                for j in range(len(ti.valid_unparsed)):
                    expression = ti.expressionType.match(ti.valid_unparsed[j])
                    self.assertEqual(f'{ti.valid_parsed[j]}', f'{expression}')
    
    def test_expression_tree_valid(self):
        for ti in self.expressionTypeList:
            with self.subTest(ti.expressionType.name):
                for j in range(len(ti.valid_unparsed)):
                    expression = ti.expressionType.match(ti.valid_unparsed[j])
                    expression2 = ti.valid_parsed[j]
                    self.assertEqual(expression, expression2)


if __name__ == '__main__':
    unittest.main()
