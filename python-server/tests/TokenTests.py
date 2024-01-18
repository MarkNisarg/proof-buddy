import unittest
import os
import sys
import re

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)

from Token import Token, TokenType
from Expression import Expression, ExpressionType



class TokenTests(unittest.TestCase):
    
    def test_TNumber_parses_one(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        match = tNumber.parse('1k')

        self.assertEqual('1', match.expand(r'\g<1>'))

    def test_TNumber_parses_twenty_one(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        match = tNumber.parse('21')

        self.assertEqual('21', match.expand(r'\g<1>'))

    def test_TNumber_parses_empty_string_returns_none(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        self.assertEqual(None, tNumber.parse(''))
    
    def test_TNumber_parses_invalid_string(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        self.assertEqual(None, tNumber.parse('k'))
    
    def test_TNumber_parses_integers_and_characters_returns_one(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        match = tNumber.parse('1k')

        self.assertEqual('1', match.expand(r'\g<1>'))
    
    def test_TNumber_parses_characters_and_integers_returns_none(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        self.assertEqual(None, tNumber.parse('k1'))

    def test_TNumber_prints_value_one(self):
        tNumber = TokenType('Number',r'(\d+)',r'\g<1>')
        match = tNumber.parse('1')
        token = Token(tNumber, match)
        self.assertEqual('1', f'{token}')

    
if __name__ == '__main__':
    unittest.main()
