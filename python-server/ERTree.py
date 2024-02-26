from Token import Token, TokenIdentifier
from Expression import ExpressionIdentifier, RacketType, Expression
# from ERType import ERType,ERTypeIdentifier
from ERProofEngine import ERProofEngine

class RacTree:
    def __init__(self, data=None, children=None,parent=None,operator=None,path=None):
        if children==None: #needed since default values can't be mutable in Python
            self.children=[] #list of nodes whose data is the entries in the S-expr. zeroth will be function
        else:
            self.children=children
        if path==None: #see above. otherwise it will be same path for all nodes!
            self.path=[] #a list of integers of how to get to this node.
        else:
            self.path=path
        if operator==None: 
            self.operator="" #empty operator, in this case will just return data
        else:
            self.operator=operator
        self.data=data #holds the value of that node, possibly "(" for S-expr which means it has children
        self.parent=parent #pointer back to the parent (technically could be derived from path)





#turns a list of string into a RacTree in a non-recursive way
def makeRtreeHelp(expList:Expression) -> RacTree:
    #if expList==[]: #should never hit this
    #    return errNode
    i=0 #this is the index currently being looked at
    currPar = None
    while i < len(expList.components):
        if expList.components[i].id=="Closed_parens": ##MATCH
            currPar = currPar.parent
        else:
            newNode = RacTree(expList.components[i], children=[],parent=currPar)
            if currPar != None: #only happens for root first time
                currPar.children.append(newNode)
        if expList.components[i].id=="(": ##MATCH
            currPar = newNode
        if i ==0:
            tree = newNode
        i+=1
    return tree

# does a BFS to assign paths to all nodes of the tree
def makeRtree(expList:list) -> RacTree:
    tree = makeRtreeHelp(expList)
    tree.pathify()
    # all of the below has been made into the tree method "pathify"
    # tree.path=[]
    # i=-1 #initializing index (gets incremented before assigment)
    # currPar = tree
    # queue = [x for x in tree.children] #need a deep copy to not destroy root's children record
    # while queue != []:
    #     node = queue[0]
    #     queue = queue[1:]+node.children
    #     if id(node.parent) == id(currPar): # need id here to prevent full node checking
    #         i+=1
    #     else:
    #         currPar = node.parent
    #         i=0
    #     node.path=node.parent.path+[i]
    return tree