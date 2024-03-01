#this is intended to complete the AST creation process after the builder set up the tree, and the labeler put on the types
#this will now find some more errors by doing the type checking, and adding other details

from Parser import *  # brings in Nodes etc
from ERobj import *   # brings in ERobject whose attributes will be used to decorate the tree
from typing import Tuple,List # used for hint annotations

def decorateTree(inputTree:Node, errLog, debug=False) -> Tuple[Node,List[str]]:
    if inputTree==None:
        return inputTree, errLog
    if inputTree.type == Type.PARAM and not inputTree.data.isalpha():
        errLog.append(f"{inputTree.data} contains illegal characters")
    for c in inputTree.children:
        decorateTree(c, errLog,debug)        
    
    # need to do 3 things:  check param names for legality
    # check number of inputs vs what's allowable
    # check types of those inputs
    # whenever there's violations, add msg to log
    return inputTree, errLog
