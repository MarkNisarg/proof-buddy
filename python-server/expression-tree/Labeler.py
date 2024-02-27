from Parser import Node
import re
class Label:
    def __init__(self, regex, dataType):
        self.regex = regex
        self.dataType = dataType

literalLibrary = {
    '_null': Label(r'(?:^)null(?:$)', None),
    '#t': Label(r'#t|#T', bool),
    '#f': Label(r'#f|#F', bool),
    '_num': Label(r'(\d+)', int),
    '_var': Label(r'(\w+)', str)
}

builtInFunctionsList = ['if', 'cons', 'first', 'rest', 'null?', '+', '-', '*', 'quotient', 'remainder']

def labelTree(inputTree:Node):
    # if inputTree is empty, return the empty list
    if inputTree == []:
        return []
    
    # get the root of the tree
    root = inputTree

    # if we are at a leaf node, the node is a literal
    if root.children == []:

        # label the node as the literal type (built-in functions/user-defined functions should already be labeled)
        for label in literalLibrary.keys():
            if root.name == None:
                matcher = re.compile(literalLibrary[label].regex)
                if matcher.match(root.data) != None:
                    root.name = label
                    root.type = literalLibrary[label].dataType
    else:
        # we are at a node where Node.data == '('
        operator = root.children[0]
        # if operator is unlabeled
        if operator.name == None:
            # figure out if it is an allowed built-in function
            for i in range(len(builtInFunctionsList)):
                if operator.data == builtInFunctionsList[i]:
                    #print('match ', builtInFunctionsList[i])
                    operator.name = builtInFunctionsList[i]
                    root.name = 'e_' + builtInFunctionsList[i] + ' '
                    root.type = 'e_' + builtInFunctionsList[i]
                    root.children[0] = operator # ensure proper replacement
                    break
        
        # if root still unlabeled, it is a user-defined-function or list of values
        if root.name == None:

            # check how the first child will be labeled
            labeledChild = labelTree(root.children[0])
            root.children[0] = labeledChild

            # if it was not a variable literal, we have a list of values
            if labeledChild.name != '_var':
                root.name = 'e_list '
                root.type = 'e_list'
            else:
                # we have a user-defined function
                labeledChild.name = labeledChild.data
                root.name = 'udf_' + labeledChild.data + ' '
                root.type = 'udf_' + labeledChild.data
                root.children[0] = labeledChild # ensure proper replacement

        # only list of values can have exactly one child
        if len(root.children) == 1:
            # remove potential udf label
            root.children[0].name = None

            # relabel as literal
            relabeledChild = labelTree(root.children[0])
            root.children[0] = relabeledChild # ensure proper replacement
            root.name = 'e_list '
            root.type = 'e_list'
            

        # continue labeling children
        for child in root.children:
            labelTree(child)
    return root
    
    