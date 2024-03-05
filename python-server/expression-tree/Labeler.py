from Parser import Node
import re
from typeFile import Type
from ERobj import *

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
UDFdict = {"fact": {"type":(Type.INT, Type.INT), "numArgs":1}}


def labelTree(inputTree:Node):
    # if inputTree is empty, return the empty list
    if inputTree == []:
        return
    
    root = inputTree
    data = root.data
    if inputTree.data in builtInFunctionsList:
        erObj = pdict[inputTree.data]
        inputTree.type = (erObj.ins, erObj.outtype)
        inputTree.numArgs = erObj.numArgs
    elif inputTree.data in userDefinedFunctionsList:
        inputTree.type = UDFdict[inputTree.data]["type"]
        inputTree.numArgs = UDFdict[inputTree.data]["numArgs"] 
    else:
        for label in literalLibrary:
            matcher = re.compile(label.regex)
            if matcher.match(root.data) != None:
                root.type = (None,label.dataType)
                break

    if root.type == None:
        root.type = (None,Type.PARAM)

    for child in root.children:
        labelTree(child)

    return root