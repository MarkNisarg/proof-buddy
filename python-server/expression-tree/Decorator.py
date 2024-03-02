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
    erObj = pdict[func.data]
    expectedCount = erObj.numArgs
    providedCount = len(treeNode.children) - 1

    if expectedCount != providedCount:
        return f"{func.name} only takes {expectedCount} arguments, but {providedCount} {'was' if providedCount==1 else 'were'} provided"
    
    return None


def checkFunctions(inputTree:Node, errLog, debug=False) -> Tuple[Node,List[str]]:
    if inputTree == None:
        return inputTree, errLog
    
    if len(inputTree.children) > 0 and (inputTree.type == Type.LIST and inputTree.children[0].type == Type.FUNCTION):
        errMsg = argQty(inputTree)
        
        if errMsg:
            errLog.append(errMsg)
        
        errMsg = typeCheck(inputTree)
        
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


###TODO: Recurse if an argument is a list to check the list's output type - check operator found in list, and run typeCheck on the list itself
### to see if the operation is valid too
###TODO: make this more readable
def typeCheck(inputTree:Node, debug=False) -> str:  
    if inputTree.type == Type.LIST:
        operator = inputTree.children[0]
        if operator.type == Type.FUNCTION:

            #Math cases
            if operator.data in ['+','-','*',"=","<=",">=","<",">"]:
                if len(inputTree.children) != 3:
                    return f"arithmetic takes 2 arguments, but {len(inputTree.children)-1} were provided"
                
                #First argument
                if inputTree.children[1].type != Type.INT:
                    if inputTree.children[1].type == Type.PARAM:
                        if inputTree.children[1].data in env:
                            if env[inputTree.children[1].data] != Type.INT: #If param is in env but param type is incorrect:
                                return f"arithmetic should have argument 2 as int, but {str(env[inputTree.children[1].data])} was provided."
                        else:
                            env[inputTree.children[1].data] = Type.INT #If param not in env, add to env and designate as int
                            if debug: 
                                print(env)
                    else:
                        return f"arithmetic should have argument 2 as int, but {inputTree.children[1].type} was provided."
                    
                #Second argument
                if inputTree.children[2].type != Type.INT:
                    if inputTree.children[2].type == Type.PARAM:
                        if inputTree.children[2].data in env:
                            if env[inputTree.children[2].data] != Type.INT: #If param is in env but param type is incorrect:
                                return f"arithmetic should have argument 3 as int, but {env[inputTree.children[2].data]} was provided."
                        else:
                            env[inputTree.children[2].data] = Type.INT #If param not in env, add to env and designate as int
                            if debug:
                                print(env)
                    else:
                        return f"arithmetic should have argument 3 as int, but {inputTree.children[2].type} was provided."

            #If cases        
            if operator.data == 'if':
                if len(inputTree.children) != 4:
                    return f"if takes 3 arguments, but {len(inputTree.children)-1} were provided"
                
                #First argument
                if inputTree.children[1].type != Type.BOOL:
                    if inputTree.children[1].type == Type.PARAM:
                        if inputTree.children[1].data in env:
                            if env[inputTree.children[1].data] != Type.BOOL: #If param is in env but param type is incorrect:
                                return f"if should have argument 2 as bool, but {env[inputTree.children[1].data]} was provided."
                        else:
                            env[inputTree.children[1].data] = Type.BOOL #If param not in env, add to env and designate as int
                            if debug:
                                print(env)
                    elif inputTree.children[1].type == Type.LIST:
                        #recursive check output type of list
                        pass
                    else:
                        return f"if should have argument 2 as bool, but {env[inputTree.children[1].data]} was provided."
                
                #Second and third arguments    
                if inputTree.children[2].type != inputTree.children[3].type:
                         return f"if should have arguments 2 and 3 same type, but arg 2 is {inputTree.children[2].type} and arg 3 is {inputTree.children[3].type}."

            #Cons cases        
            if operator.data == 'cons':
                if len(inputTree.children) != 3:
                    return f"cons takes 2 arguments, but {len(inputTree.children)-1} were provided"
                if inputTree.children[1].type == Type.PARAM and inputTree.children[1].data not in env:
                    env[inputTree.children[1].data] = Type.ANY #add param to env
                elif inputTree.children[2].type != Type.LIST:
                    return f"cons should have argument 2 as list, but {inputTree.children[2].type} was provided" #not complete, handle quote 
        
            #Not cases
            if operator.data == 'not':
                if len(inputTree.children) != 2:
                    return f"not takes 1 argument, but {len(inputTree.children)-1} were provided"
                if inputTree.children[1].type != Type.BOOL:
                    if inputTree.children[1].type == Type.PARAM:
                        if inputTree.children[1].data in env:
                            if env[inputTree.children[1].data] != Type.BOOL: #If param is in env but param type is incorrect:
                                return f"not should have argument 1 as bool, but {env[inputTree.children[1].data]} was provided."
                        else:
                            env[inputTree.children[1].data] = Type.BOOL #If param not in env, add to env and designate as int
                            if debug:
                                print(env)
                    else:
                        return f"not should have argument 1 as bool, but {env[inputTree.children[1].data]} was provided."
            
            #First cases        
            if operator.data == 'first':
                if len(inputTree.children) != 2:
                    return f"first takes 1 argument, but {len(inputTree.children)-1} were provided"
                if inputTree.children[1].type != Type.LIST:
                    return f"first should have argument 1 as list, but {inputTree.children[1].type} was provided" 
                
            #Rest cases        
            if operator.data == 'rest':
                if len(inputTree.children) != 2:
                    return f"rest takes 1 argument, but {len(inputTree.children)-1} were provided"
                if inputTree.children[1].type != Type.LIST:
                    return f"rest should have argument 1 as list, but {inputTree.children[1].type} was provided" 
            
            ##Or cases
            if operator.data == 'or':
                if len(inputTree.children) != 3:
                    return f"or takes 2 arguments, but {len(inputTree.children)-1} were provided"
                if inputTree.children[1].type != Type.BOOL:
                    if inputTree.children[1].type == Type.PARAM:
                        if inputTree.children[1].data in env:
                            if env[inputTree.children[1].data] != Type.BOOL: #If param is in env but param type is incorrect:
                                return f"or should have argument 1 as bool, but {env[inputTree.children[1].data]} was provided."
                        else:
                            env[inputTree.children[1].data] = Type.BOOL #If param not in env, add to env and designate as int
                            if debug:
                                print(env)
                    else:
                        return f"or should have argument 1 as bool, but {inputTree.children[1].type} was provided."
                if inputTree.children[2].type != Type.BOOL:
                    if inputTree.children[2].type == Type.PARAM:
                        if inputTree.children[2].data in env:
                            if env[inputTree.children[2].data] != Type.BOOL: #If param is in env but param type is incorrect:
                                return f"or should have argument 2 as bool, but {env[inputTree.children[1].data]} was provided."
                        else:
                            env[inputTree.children[2].data] = Type.BOOL #If param not in env, add to env and designate as int
                            if debug:
                                print(env)
                    else:
                        return f"or should have argument 2 as bool, but {inputTree.children[1].type} was provided."
                

            