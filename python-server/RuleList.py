# from Rule import Rule
from TList import TList

# We should just add a name field to TList if we're still using that class
class RuleList(TList):
    """
    This will likely be removed later, but was originally intended to contain a list of Rules,
    together with a name, that can be assigned to a Proof as what Rules are allowed to be applied
    within the Proof. This was changed so that the Proof object contains just a list of Rule objects
    instead. The TList was created to only contain objects of a single type, but is an overcomplication
    and will not be needed.
    """
    def __init__(self, name:str='', rules:list=[]):
        super().__init__('Rule',rules)
        self.name = name