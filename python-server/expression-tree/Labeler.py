from Parser import Node
import re
from typeFile import Type

class Label:
    def __init__(self, regex, dataType):
        self.regex = regex
        self.dataType = dataType

literalLibrary = [
    Label(r'(?:^)null(?:$)', Type.NONE),
    Label(r'#t|#T', Type.BOOL),
    Label(r'#f|#F', Type.BOOL),
    Label(r'(\d+)', Type.INT),
    Label(r'([a-zA-Z]+\??)', Type.PARAM)
]

builtInFunctionsList = ['if', 'cons', 'first', 'rest', 'null?', '+', '-', '*', 'quotient', 'remainder','zero?']
userDefinedFunctionsList = ['fact']

def labelTree(inputTree:Node):
    # if inputTree is empty, return the empty list
    if inputTree == []:
        return
    
    root = inputTree
    data = root.data
    if data in builtInFunctionsList or data in userDefinedFunctionsList:
        root.type = Type.FUNCTION
    elif data == '(':
        root.type = Type.LIST
    else:
        for label in literalLibrary:
            matcher = re.compile(label.regex)
            if matcher.match(root.data) != None:
                root.type = label.dataType

    for child in root.children:
        labelTree(child)

    return root
    
    