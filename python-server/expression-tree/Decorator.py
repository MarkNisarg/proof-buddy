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
        inputTree.type = Type.ERROR

    # populate new Node attributes from the ERobjects
    inputTree.name = inputTree.data # default. will be overriden with more appropriate choices in the conditional below
    if inputTree.type == Type.FUNCTION:
        erObj = pdict[inputTree.data]
        inputTree.ins = erObj.ins
        inputTree.outtype = erObj.outtype
        inputTree.numArgs = erObj.numArgs
    elif inputTree.type == Type.LIST:
        erObj = pdict[inputTree.data]
        inputTree.length=erObj.length
    elif inputTree.type == Type.INT:
        inputTree.name = int(inputTree.data)
    elif inputTree.type == Type.BOOL:
        erObj = pdict[inputTree.data]
        inputTree.name = erObj.value

    for c in inputTree.children:
        decorateTree(c, errLog,debug)        
    return inputTree, errLog


def argQty(treeNode:Node) -> str:
    func = treeNode.children[0]
    #erObj = pdict[func.data] # commented out this line, func should already have its numArgs attribute set
    expectedCount = func.numArgs
    providedCount = len(treeNode.children) - 1

    if expectedCount != providedCount:
        return f"{func.name} only takes {expectedCount} arguments, but {providedCount} {'was' if providedCount==1 else 'were'} provided"
    
    return typeCheck(treeNode) # only typeCheck if everything passes


def checkFunctions(inputTree:Node, errLog, debug=False) -> Tuple[Node,List[str]]:
    if inputTree == None:
        return inputTree, errLog
    
    if len(inputTree.children) > 0 and (inputTree.type == Type.LIST and inputTree.children[0].type == Type.FUNCTION):
        errMsg = argQty(inputTree)
        
        if errMsg:
            errLog.append(errMsg)

    for child in inputTree.children:
        checkFunctions(child, errLog, debug)
    return inputTree, errLog


'''
two new functions in this file: argQty(inputree,errLog)->bool and typeCheck(inputTree, errLog)
CAUTION:  (+ (+ 3 #t) 4 5) should give two errors. so do both before recursing to future nodes.

only need to check in the case in which parent is ( and child[0] is a function.
i.e. (1...) doesn't matter, and (if #t + *) doesn't matter for the + (but it does for the if)
best way is to check the inputs/type WHEN you hit the (
note: be sure to subtract one from the length of the children (to acct for the fact that child0=the function)

check number of inputs vs what's allowable.
(+ 4 5 6) should produce an error msg (i.e. appended to errLog) "+ only takes 2 arguments, but 3 were provided"

check types of those inputs
(+ 3 #f) should produce an error msgs "+ should have argument #2 as an int but a bool was provided"

'''

env={} #env dictionary to keep track of params, having it out here so it stays across iterations temporarily



def typeCheck(inputTree:Node, debug=False) -> str:
    func = inputTree.children[0]
    expectedIns = func.ins
    providedIns = tuple(child.type for child in inputTree.children[1:])
    if debug:
        print(f"expectedIns {expectedIns} providedIns {providedIns}")
    
    if len(expectedIns) != len(providedIns):
        return f"{func.name} takes in types {expectedIns}, but provided inputs were {providedIns}"  
    else:
        for childIndex, childType in enumerate(providedIns):
            childIndex = childIndex + 1 # offset childIndex by one to get actual index of child
            if childType == Type.PARAM:
                childData = inputTree.children[childIndex].data
                if childData not in env.keys():
                    env[childData] = expectedIns[childIndex-1] # need to subtract 1 to get correct index
                elif env[childData] != expectedIns[childIndex-1]:
                    return f"{func.name} at argument #{childIndex} takes a parameter '{childData}' expected to be type {expectedIns[childIndex-1]} but {env[childData]} was provided"
            elif childType == Type.LIST:
                listType = inputTree.children[childIndex].outtype
                if listType != expectedIns[childIndex-1]:
                    return f"{func.name}'s list at argument #{childIndex} expected to output type {expectedIns[childIndex-1]} but {listType} was provided"
            elif childType != expectedIns[childIndex-1]:
                return f"{func.name} takes in types {expectedIns}, but provided inputs were {providedIns}"  
    return None
    ##TODO: Handle recursive case - if list, enter list and check outtype, pass back up to see if matches respective intype
    ##TODO: if param, check if in env dict - if in env, check if value matches type needed, if not in env add to env and set value to expected type
    ##else do this
               

            