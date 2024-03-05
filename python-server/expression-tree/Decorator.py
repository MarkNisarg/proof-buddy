# This file is intended to complete the AST creation process and find some more errors through restrictions like type checking, and adding other details

from Parser import * # brings in Nodes etc
from ERobj import pdict # brings in ERobject whose attributes will be used to decorate the tree
from typeFile import * # bring in type specification

# types to be potentially replaced
FLEX_TYPES = [Type.FUNCTION, Type.TEMP, Type.ANY, Type.PARAM, Type.NONE]

def decorateTree(inputTree:Node, errLog, debug=False) -> tuple[Node,list[str]]:
    # just return if there is not AST to decorate
    if inputTree==None:
        return inputTree, errLog
    
    # check if parameter name is legal
    if inputTree.type.getType() == Type.PARAM and not inputTree.data.isalpha():
        errLog.append(f"{inputTree.data} contains illegal characters")
        inputTree.type = RacType((None, Type.ERROR))

    # populate new Node attributes from the ERobjects, default Node.name is set to the Node.data attribute
    inputTree.name = inputTree.data
    
    # decorate non-function type Node objects
    if not inputTree.type.isType("FUNCTION"):         
        if inputTree.type.isType("LIST"):
            erObj = pdict[inputTree.data]
            inputTree.length=erObj.length
        elif inputTree.type.isType("INT"):
            inputTree.name = int(inputTree.data)
        elif inputTree.type.isType("BOOL"):
            erObj = pdict[inputTree.data.lower()]
            inputTree.name = erObj.value

    # decorate the children if there are any 
    for c in inputTree.children:
        decorateTree(c, errLog,debug)

    # return a decorated AST and the status of the error log        
    return inputTree, errLog

# TODO: write a function to scan for nested quotes and return err

# helper function which moves important details from one node to another when getting rid of TEMP types
def copyDetails(fromNode:Node, toNode:Node): # note that the .data is NOT copied, e.g. it can stay "("
    toNode.type = fromNode.type
    if fromNode.type.getType() == Type.FUNCTION:
        toNode.numArgs = fromNode.numArgs # note we cannot pass name/value e.g. (if x + *)

# this function gets rid of all Type.TEMPs and does type checking for 'if' functions. can internally change the AST and update the errLog
def remTemps(inputTree:Node, errLog, debug=False) -> list[str]:
    if inputTree == None or inputTree.type.isType("TEMP"):
        return errLog # it's either a quoted list or not a list, so nothing to check
    
    # from this point on, we know the subexpression starts with an unquoted list, a "(" token
    if inputTree.children == []:
        errLog.append('cannot evaluate an empty list; perhaps "null" was intended')
        return errLog # can return and skip recursion since no children
    
    # get the operator from the first child
    operator = inputTree.children[0]

    # check for a valid function to evaluate
    if operator.type.getType() not in FLEX_TYPES: 
        errLog.append(f"{operator.data} is not a function that can be evaluted")

    # special check for "if" operator
    if operator.data=="if": # setting special check for 2nd/3rd args same and changing the if-outtype

        # checking number of provided arguments 
        argCount = len(inputTree.children) - 1
        if argCount != 3:
            errLog.append(f"the if function requires 3 arguments but {argCount} were provided")

        # check the types of the arguments fulfill 'if' restrictions (cond = bool, both branches output the same type)
        else:

            # remove temps from the children of the Node object 
            for c in inputTree.children[1:]: # index starts at 1 to skip the "if" token
                errLog = remTemps(c,errLog) # accumulating any errs found from inside the if

            # default a FLEX_TYPES type to be a boolean
            if inputTree.children[1].type.getType() in FLEX_TYPES: 
                inputTree.children[1].type = RacType((None,Type.BOOL))
            
            # check for a boolean type for the first argument of "if"
            if not inputTree.children[1].type.isType("BOOL"):
                errLog.append("argument #1 of an if function must be Boolean")
            
            
            n1, n2 = inputTree.children[2], inputTree.children[3]
            typ1, typ2 = n1.type.getType(), n2.type.getType()
            if typ1 in FLEX_TYPES and typ2 not in FLEX_TYPES: #overriding some anys/param/temps
                copyDetails(n2, n1)
            elif typ1 not in FLEX_TYPES and typ2 in FLEX_TYPES:
                copyDetails(n1,n2)
            if  typ1!=typ2:
                errLog.append(f"final arguments of an if function must match, but {typ1} and {typ2} provided")
            elif typ1 == Type.FUNCTION:
                if n1.type.getDomain() != n2.type.getDomain():
                    errLog.append("function domains must match for both if branches")
                elif n1.getRange() != n2.getRange(): #note: range err not caught if domains don't match. but ok
                    errLog.append("function ranges must match for both if branches")
                else:
                    copyDetails(n1, inputTree) #both if branchs are functions with same ins/outs
            else: #both if branch types are the same, but aren't functions
                inputTree.type = n1.getType() #TODO: potential problem if both ANYs. for now, just propogate ANY up.     
    elif operator.getDomain() != None: # at this point, ifs are taken care of, so after the ( it's either a Temp/Any/Param or non-if function 
        if operator.getRange() not in FLEX_TYPES: #NOTE: is an outtype of any/param/temp impossible?
            inputTree.type = (operator.getDomain(), operator.getRange())
        if operator.getRange() == Type.FUNCTION: #TODO: the type=Function needs to be bundled with in/out
        #TODO:  example: ((addn x) y) = (x+y). so addn has type: "FUNC: int-> (int->list)"
        #TODO: but until we make that change, we will have to approve all higher order Functions as legit
        # this is a placeholder. really needs to be inputTree.type=Func:(operator.out.in)->(operator.out.out)
            inputTree.type=([Type.ANY], Type.ANY)
            inputTree.numArgs = None #TODO: this needs to be length(operator.out.in) or look at definition window
    if inputTree.data !="if": #since already did recursion in the special case, so avoiding repitition
        for c in inputTree.children[1:]:
            errLog = remTemps(c,errLog)
    #last case is where the operater is a temp/any/param, such as (x 3 4) in "(if (x = +) (x 3 4) 7)"
    if operator.getRange() in FLEX_TYPES: #only untested case so far
        listIns= []
        for c in inputTree.children[1:]:
            listIns.append(c.type)
        operator.type = (listIns, Type.ANY)
        operator.numArgs = len(listIns)
    return errLog     

def argQty(treeNode:Node) -> str:
    func = treeNode.children[0]
    expectedCount = func.numArgs
    providedCount = len(treeNode.children) - 1

    if expectedCount != providedCount:
        return f"{func.name} only takes {expectedCount} arguments, but {providedCount} {'was' if providedCount==1 else 'were'} provided"
    
    return typeCheck(treeNode) # only typeCheck if everything passes


def checkFunctions(inputTree:Node, errLog, debug=False) -> tuple[Node,list[str]]:
    if inputTree == None:
        return inputTree, errLog
    
    if len(inputTree.children) > 0 and (inputTree.getRange() == Type.LIST and inputTree.children[0].getDomain() != None):
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


#TODO: fix function with new type implementation
def typeCheck(inputTree:Node, debug=False) -> str:
    func = inputTree.children[0]
    expectedIns = func.type
    providedIns = tuple(child.type for child in inputTree.children[1:])
    if debug:
        print(f"expectedIns {expectedIns} providedIns {providedIns}")
    
    if len(expectedIns) != len(providedIns):
        return f"{func.name} takes in types {expectedIns}, but provided inputs were {providedIns}"  
    else:
        for childIndex, childType in enumerate(providedIns):
            childIndex = childIndex + 1 # offset childIndex by one to get actual index of child
            if childType[1] == Type.PARAM:
                childData = inputTree.children[childIndex].data
                if childData not in env.keys():
                    env[childData] = expectedIns[childIndex-1] # need to subtract 1 to get correct index
                elif (env[childData] != expectedIns[childIndex-1]) and expectedIns[childIndex-1] not in FLEX_TYPES:
                    return f"{func.name} at argument #{childIndex} takes a parameter '{childData}' expected to be type {expectedIns[childIndex-1]} but {env[childData]} was provided"
            elif childType[1] == Type.LIST:
                listType = inputTree.children[childIndex].type[1]
                if (listType != expectedIns[childIndex-1]) and expectedIns[childIndex-1] not in FLEX_TYPES:
                    return f"{func.name}'s list at argument #{childIndex} expected to output type {expectedIns[childIndex-1]} but {listType} was provided"
            elif (childType != expectedIns[childIndex-1]) and expectedIns[childIndex-1] not in FLEX_TYPES:
                return f"{func.name} takes in types {expectedIns}, but provided inputs were {providedIns}"  
    return None