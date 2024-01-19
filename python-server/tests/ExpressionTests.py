import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)

from Expression import Expression, ExpressionType
from Token import Token, TokenType

class ExpressionTestInstance(NamedTuple):
    expressionType: ExpressionType
    valid_unparsed: list[str]
    valid_parsed: list[str]
    invalid_unparsed: list[str]

class ExpressionTests(unittest.TestCase):
    def setUp(self):    
        tTrue = TokenType('True',r'#t','#t')
        tokenTrue = tTrue.parse('#t')
        tSymbol = TokenType('Symbol',r'([A-Z])',r'\g<1>')
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
        pass
        # for ti in self.expressionTypeList:
        #     with self.subTest(ti.expressionType.name):
        #         for j in range(len(ti.valid_unparsed)):
        #             expression = ti.expressionType.match(ti.valid_unparsed[j])
        #             for s in expression.type.structure:
        #                 for i in range(len(ti.valid_unparsed[j])-len(self.structure)+1):
        #                     hasMatch = True
        #                     for j in range(len(self.structure)):
        #                         if isinstance(ti.valid_unparsed[i+k],Expression) and self.structure[j].generic:
        #                             continue
        #                         if isinstance(inputLine[i+j],Expression) or self.structure[j].generic or \
        #                             inputLine[i+j].tokenType != self.structure[j]:
        #                                 hasMatch = False
        #                                 break
        #                 self.assertEqual(ti.valid_unparsed[s:s+len(self)], s)

if __name__ == '__main__':
    unittest.main()