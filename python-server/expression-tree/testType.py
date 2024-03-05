from typing import Union, Tuple, List
from enum import Enum
import Parser

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
    
    def __eq__(self,other):
        return self.value == other.value
class TypeList:
    def __init__(self,value:List[RacType]):
        self.value = value
    def __str__(self):
        return '[' + ', '.join(str(x) for x in self.value) + ']'
    
def getType(T:RacType)->RacType:
    if T.value[0]==None:
        return RacType((None, T.value[1]))
    return RacType(coreType.FUNCTION)

def getDomain(T:RacType)->TypeList:
    if getType(T)!=RacType(coreType.FUNCTION):
        return TypeList([RacType(coreType.ERROR)])
    return TypeList([RacType(x) for x in T.value[0]])

def getRange(T:RacType)->RacType:
    if getType(T)!=RacType(coreType.FUNCTION):
        return RacType(coreType.ERROR)
    return RacType(T.value[1])

def isType(T:RacType,val)->bool:
    return str(getType(T))==val

# this will not work for function, just for the coretypes
def setType(n:Parser.Node, strg:str):
    if strg != "FUNCTION":
        n.type=RacType((None,coreType.__members__.get(strg)))
    else:
        n.type=RacType(coreType.ERROR)
        #TODO: handle string parsing
    return


# unit tests
tests = [RacType((None, coreType.INT)), RacType((((((None, coreType.LIST), (None, coreType.BOOL)), \
        coreType.INT), (((None, coreType.INT), (None, coreType.LIST)), (None, coreType.BOOL))), (None, coreType.LIST)))]

for t in tests:
    print(f"expr is type {getType(t)}, domainList = {getDomain(t)}, range = {getRange(t)}")

testNode = Parser.Node()
t2 = RacType((None, coreType.BOOL))
t3= RacType((None, coreType.INT))
t4 = RacType((((None,coreType.INT),),(None,coreType.BOOL)))

print(isType(t3, "INT"), isType(t4,"FUNCTION"))
setType(testNode,"FUNCTION")
print(str(testNode.type))



