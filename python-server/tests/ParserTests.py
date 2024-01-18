import unittest
import os
import sys
import re

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)

sys.path.append(parent)
from Token import Token, TokenType
from Expression import Expression, ExpressionType



#class ParserTest(unittest.TestCase):
    


# if __name__ == '__main__':
#     unittest.main()
