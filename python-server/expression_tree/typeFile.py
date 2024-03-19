from typing import Union, Tuple, List
from enum import Enum


class Type(Enum):
    TEMP = 'TEMP'
    BOOL = 'BOOL'
    INT = 'INT'
    LIST = 'LIST'
    PARAM = 'PARAM'
    ANY = 'ANY'
    ERROR = 'ERROR'
    NONE = 'NONE'
    FUNCTION = 'FUNCTION' # this is only here for getType and should never be used directly

    def __str__(self):
        return self.value

RacType = Union[Tuple[None, Type], Tuple[Tuple['RacType', ...], Type]]

class TypeList:
    def __init__(self, value:list[RacType]):
        self.value = value
    def __str__(self):
        if self.value == None:
            return '[None]'
        else:
            return '[' + ', '.join(str(x) for x in self.value) + ']'

# pretty print recursive function (commas between domain elements, with > separating out range)
def helpPrint(items):
    if isinstance(items, RacType):
        return helpPrint(items.value)
    elif isinstance(items, tuple) and items[0] is None:
        return str(items[1])
    elif isinstance(items, tuple):
        domain = ', '.join(helpPrint(item) for item in items[0] if item is not None)
        range = helpPrint(items[1])
        return f"({domain}) > {range}"
    return str(items)

class RacType:
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return helpPrint(self.value)
    
    def __eq__(self,other):
        if other == None:
            return False
        else:
            return str(self) == str(other)
    
    def getType(self) -> RacType:
        if self.value[0]==None:
            return self.value[1]
        return Type.FUNCTION

    def getDomain(self):
        if self.getType() != Type.FUNCTION:
            return None
        return [RacType(x) for x in self.value[0]]

    def getRange(self) -> RacType:
        return RacType(self.value[1])

    def isType(self, typeStr)->bool:
        return str(self.getType()) == typeStr
'''
# unit tests
tests = [RacType((None, Type.INT)), RacType((((((None, Type.LIST), (None, Type.BOOL)), \
        Type.INT), (((None, Type.INT), (None, Type.LIST)), (None, Type.BOOL))), (None, Type.LIST)))]

for t in tests:
    print(f"expr is type {t.getType()}, domainList = {TypeList(t.getDomain())}, range = {t.getRange()}")
'''