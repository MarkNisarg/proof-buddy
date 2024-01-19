import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)
from Token import Token, TokenType

class TokenTestInstance(NamedTuple):
    tokenType: TokenType
    valid_unparsed: list[str]
    valid_parsed: list[str]
    invalid_unparsed: list[str]

class TokenTests(unittest.TestCase):
    def setUp(self):
        self.tokenTypeList = list[TokenTestInstance]()
        self.tokenTypeList.append(TokenTestInstance(
            TokenType('Number',r'(\d+)',r'\g<1>'),
            ['1', '21', '1k'],
            ['1', '21', '1'],
            ['j1', '', 'kjl']
            ))
        self.tokenTypeList.append(TokenTestInstance(
            TokenType('True',r'#t|#T','#t'),
            ['#t', '#T', '#true'],
            ['#t', '#t', '#t'],
            ['t', 'T', '']
            ))
        self.tokenTypeList.append(TokenTestInstance(
            TokenType('False',r'#f|#F','#f'),
            ['#f', '#F', '#false'],
            ['#f', '#f', '#f'],
            ['f', 'F', '']
            ))
        self.tokenTypeList.append(TokenTestInstance(
            TokenType('Lambda',r'λ|#L','λ'),
            ['λ', '#L'],
            ['λ', 'λ'],
            ['lambda', 'L', '']
            ))

    def test_tokentype_parse_valid_list_of_strings(self):        
        for ti in self.tokenTypeList:
            with self.subTest(ti.tokenType.name):
                for s in ti.valid_unparsed:
                    token = ti.tokenType.parse(s)
                    self.assertIsNotNone(token)

    def test_token_print_valid_list_of_strings(self):
        for ti in self.tokenTypeList:
            with self.subTest(ti.tokenType.name):
                for j, s in enumerate(ti.valid_unparsed):
                    token = ti.tokenType.parse(s)
                    self.assertEqual(ti.valid_parsed[j], f'{token}')

    def test_tokentype_parse_invalid_list_of_strings(self):
        for ti in self.tokenTypeList:
            with self.subTest(ti.tokenType.name):
                for s in ti.invalid_unparsed:
                    token = ti.tokenType.parse(s)
                    self.assertIsNone(token)

if __name__ == '__main__':
    unittest.main()
