# from Rule import Rule
from TList import TList

# We should just add a name field to TList if we're still using that class
class RuleList(TList):
    def __init__(self, name:str='', rules:list=[]):
        super().__init__('Rule',rules)
        self.name = name