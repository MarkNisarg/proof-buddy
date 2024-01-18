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
        eBoolean = ExpressionType('Boolean',[tTrue])
        self.expressionTypeList = list[ExpressionTestInstance]()
        self.expressionTypeList.append(ExpressionTestInstance(
            eBoolean,
            [
                [tokenTrue]
            ],[
                [Expression(eBoolean, [tokenTrue])]
            ],[])
        )

    def test_expressiontype_parse_valid_list_of_tokens(self):        
        for ti in self.expressionTypeList:
            with self.subTest(ti.expressionType.name):
                for s in ti.valid_unparsed:
                    expression = ti.expressionType.match(s)
                    self.assertIsNotNone(token)



if __name__ == '__main__':
    unittest.main()