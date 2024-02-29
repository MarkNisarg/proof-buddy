from enum import Enum, auto

class AutoName(Enum):
    @staticmethod
    def _generate_next_value_(name, start, count, last_values):
        return name
    
class Type(AutoName):
    TEMP = auto() # a temporary place-holder type, until we distinguish strings as either functions or parameters
    BOOL = auto()
    INT = auto()
    LIST = auto()
    FUNCTION = auto()
    PARAM = auto()
    ANY= auto()
    ERROR = auto()
    NONE = auto()