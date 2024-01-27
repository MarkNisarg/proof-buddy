import unittest
import os
import sys
from typing import NamedTuple

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)
from Token import Token, TokenIdentifier

class TokenTestInstance(NamedTuple):
    tokenIdentifier: TokenIdentifier
    valid_unparsed: list[str]
    valid_parsed: list[str]
    invalid_unparsed: list[str]

class TokenTests(unittest.TestCase):
    def setUp(self):
        self.tokenIdentifierList = list[TokenTestInstance]()
        self.tokenIdentifierList.append(TokenTestInstance(
            TokenIdentifier('Number',r'(\d+)',r'\g<1>'),
            ['1', '21', '1k'],
            ['1', '21', '1'],
            ['j1', '', 'kjl']
            ))
        self.tokenIdentifierList.append(TokenTestInstance(
            TokenIdentifier('True',r'#t|#T','#t'),
            ['#t', '#T', '#true'],
            ['#t', '#t', '#t'],
            ['t', 'T', '']
            ))
        self.tokenIdentifierList.append(TokenTestInstance(
            TokenIdentifier('False',r'#f|#F','#f'),
            ['#f', '#F', '#false'],
            ['#f', '#f', '#f'],
            ['f', 'F', '']
            ))
        self.tokenIdentifierList.append(TokenTestInstance(
            TokenIdentifier('Lambda',r'λ|#L','λ'),
            ['λ', '#L'],
            ['λ', 'λ'],
            ['lambda', 'L', '']
            ))

    def test_tokenidentifier_parse_valid_list_of_strings(self):
        for ti in self.tokenIdentifierList:
            with self.subTest(ti.tokenIdentifier.name):
                for s in ti.valid_unparsed:
                    token = ti.tokenIdentifier.parse(s)
                    self.assertIsNotNone(token)

    def test_token_print_valid_list_of_strings(self):
        for ti in self.tokenIdentifierList:
            with self.subTest(ti.tokenIdentifier.name):
                for j, s in enumerate(ti.valid_unparsed):
                    token = ti.tokenIdentifier.parse(s)
                    self.assertEqual(ti.valid_parsed[j], f'{token}')

    def test_tokenidentifier_parse_invalid_list_of_strings(self):
        for ti in self.tokenIdentifierList:
            with self.subTest(ti.tokenIdentifier.name):
                for s in ti.invalid_unparsed:
                    token = ti.tokenIdentifier.parse(s)
                    self.assertIsNone(token)

if __name__ == '__main__':
    unittest.main()
