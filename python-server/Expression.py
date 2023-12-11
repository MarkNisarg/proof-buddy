from TList import TList
from enum import Enum
# from Parser import Token

# This is currently deprecated by the Expression class within Parser.py

# Instanced by each specific type of expression (should be abstract)
class Expression:
    def __init__(self, subcomponents:TList=[], token:str=''):
        self.token = token
        self.isRoot = False
        self.subcomponents = []
        
        # self.type = 
        if subcomponents and not subcomponents.T == 'Expression':
            print('Error')
        else:
            self.subcomponents = subcomponents

    def __str__(self):
        return self.token