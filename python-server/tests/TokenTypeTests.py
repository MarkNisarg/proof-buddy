import unittest
import os
import sys
import re

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)

from Token import Token, TokenType
from Expression import Expression, ExpressionType

class TokenTypeTests(unittest.TestCase):

    def test_tokentype_parse_valid_list_of_strings(self):
            tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
            strings = ['1', '21', '1k']
            
            for i, s in enumerate(strings):
                with self.subTest(i=i):
                    match = tNumber.parse(s)
                    self.assertIsNotNone(match)

    def test_tokentype_print_valid_list_of_strings(self):
            tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
            strings = ['1', '21', '1k']
            string2 = ['1', '21', '1']
            
            for i, s in enumerate(strings):
                with self.subTest(i=i):
                    match = tNumber.parse(s)
                    self.assertEqual(string2[i], match.expand(tNumber.printRegex))

    def test_tokentype_parse_invalid_list_of_strings(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        strings = ['j1', '', 'kjl']
 
        for i, s in enumerate(strings):
            with self.subTest(i=i):
                match = tNumber.parse(s)
                self.assertIsNone(match)


if __name__ == '__main__':
    unittest.main()
