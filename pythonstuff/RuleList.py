# from Rule import Rule
from TList import TList

class RuleList(TList):
    def __init__(self, name:str='', rules:list=[]):
        super().__init__('Rule',rules)
        self.name = name