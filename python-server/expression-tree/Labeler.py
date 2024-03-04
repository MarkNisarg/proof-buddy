from Parser import Node
import re
from typeFile import Type

class Label:
    def __init__(self, regex, dataType):
        self.regex = regex
        self.dataType = dataType

literalLibrary = [
    Label(r'(?:^)null(?:$)', Type.LIST),
    Label(r'(?:^)\'\((?:$)', Type.LIST),
    Label(r'^\($', Type.TEMP),
    Label(r'#t|#T', Type.BOOL),
    Label(r'#f|#F', Type.BOOL),
    Label(r'(\d+)', Type.INT),
    #Label(r'^[a-zA-Z]+$', Type.PARAM) # this is the new default. the Decorator catches invalid names
]

builtInFunctionsList = ['if', 'cons', 'first', 'rest', 'null?', '+', '-', '*', 'quotient', 'remainder','zero?',\
                        "expt","=","<=",">=","<",">","and","or","not","xor","implies","list?","int?"]
userDefinedFunctionsList = ['fact']
UDFdict = {"fact": {"type":Type.FUNCTION,"ins":(Type.INT,),"outtype":Type.INT,"numArgs":1}}


def labelTree(inputTree:Node):
    # if inputTree is empty, return the empty list
    if inputTree == []:
        return
    
    root = inputTree
    data = root.data
    if data in builtInFunctionsList or data in userDefinedFunctionsList:
        root.type = Type.FUNCTION
    else:
        for label in literalLibrary:
            matcher = re.compile(label.regex)
            if matcher.match(root.data) != None:
                root.type = label.dataType
                break

    if root.type == None:
        root.type = Type.PARAM

    for child in root.children:
        labelTree(child)

    return root