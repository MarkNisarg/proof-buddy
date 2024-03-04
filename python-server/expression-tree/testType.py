from typing import Union, Tuple
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

    def __str__(self):
        return self.value

RacType = Union[Tuple[None, coreType], Tuple[Tuple['RacType', ...], coreType]]

# Standalone recurse function
def helpPrint(items):
    if isinstance(items, RacTypeClass):
        return helpPrint(items.value)
    elif isinstance(items, tuple) and items[0] is None:
        return str(items[1])
    elif isinstance(items, tuple):
        # Extract and process the first element
        domain = ', '.join(helpPrint(item) for item in items[0] if item is not None)
        # Process the second element
        range = helpPrint(items[1])
        return f"({domain}) > {range}"
    return str(items)

class RacTypeClass:
    def __init__(self, value: RacType):
        self.value = value

    def __str__(self):
        return helpPrint(self.value)

# Example usage
ex1 = RacTypeClass((((((None, coreType.LIST), (None, coreType.BOOL)), coreType.INT), \
                     (((None, coreType.INT), (None, coreType.LIST)), coreType.BOOL)), \
                    coreType.LIST))
print(ex1) # "((LIST, BOOL) > INT, (INT, LIST) > BOOL) > LIST"
