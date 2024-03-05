from typing import Union, Tuple, List
from enum import Enum
import Parser

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
        return self.value == other.value
    
    def getType(self) -> RacType:
        if self.value[0]==None:
            return self.value[1]
        return Type.FUNCTION

    def getDomain(self):
        if self.getType() != Type.FUNCTION:
            return None
        return TypeList([RacType(x) for x in self.value[0]])

    def getRange(self) -> RacType:
        return RacType(self.value[1])

    def isType(self, typeStr)->bool:
        return str(self.getType()) == typeStr
    
# this will not work for function, just for the coretypes
def setType(n:Parser.Node, strg:str):
    if strg != "FUNCTION":
        n.type=RacType((None,Type.__members__.get(strg)))
    else:
        n.type=RacType(Type.ERROR)
        #TODO: handle string parsing
    return


# unit tests
tests = [RacType((None, Type.INT)), RacType((((((None, Type.LIST), (None, Type.BOOL)), \
        Type.INT), (((None, Type.INT), (None, Type.LIST)), (None, Type.BOOL))), (None, Type.LIST)))]

for t in tests:
    print(f"expr is type {t.getType()}, domainList = {t.getDomain()}, range = {t.getRange()}")

testNode = Parser.Node()
t2 = RacType((None, Type.BOOL))
t3= RacType((None, Type.INT))
t4 = RacType((((None,Type.INT),),(None,Type.BOOL)))

print(t3.isType("INT"), t4.isType("FUNCTION"))
setType(testNode,"FUNCTION")
print(str(testNode.type))



