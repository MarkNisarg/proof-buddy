from typing import Union, Tuple, List
from enum import Enum

class coreType(Enum):
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

RacType = Union[Tuple[None, coreType], Tuple[Tuple['RacType', ...], coreType]]

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
    def __init__(self, value: RacType):
        self.value = value

    def __str__(self):
        return helpPrint(self.value)
class TypeList:
    def __init__(self,value:List[RacType]):
        self.value = value
    def __str__(self):
        return '[' + ', '.join(str(x) for x in self.value) + ']'
    
def getType(T:RacType)->coreType:
    if T.value[0]==None:
        return T.value[1]
    return coreType.FUNCTION

def getDomain(T:RacType)->TypeList:
    if getType(T)!=coreType.FUNCTION:
        return TypeList([RacType(coreType.ERROR)])
    return TypeList([RacType(x) for x in T.value[0]])

def getRange(T:RacType)->RacType:
    if getType(T)!=coreType.FUNCTION:
        return RacType(coreType.ERROR)
    return RacType(T.value[1])

# unit tests
tests = [RacType((None, coreType.INT)), RacType((((((None, coreType.LIST), (None, coreType.BOOL)), \
        coreType.INT), (((None, coreType.INT), (None, coreType.LIST)), coreType.BOOL)), coreType.LIST))]

for t in tests:
    print(f"expr is type {getType(t)}, domainList = {getDomain(t)}, range = {getRange(t)}")