import re

class Node:
    def __init__(self, children=[], parent=None, data=''):
        self.children = children
        self.parent = parent
        self.data = data

    def __str__(self):
        # return f'{self.children}, {self.parent}, {self.data}'
        ans = self.data
        if len(self.children) > 0:
            for i in range(len(self.children)):
                if i == len(self.children)-1:
                    ans += str(self.children[i])
                else:
                    ans += str(self.children[i]) + ' '
            ans += ')'
        return ans
        

def preProcess(inputString:str) -> list:
    inputString = inputString.lower()
    parenPairing = 0
    for char in inputString:
        if char == '(':
            parenPairing += 1
        elif char == ')':
            parenPairing -= 1
    if parenPairing == 0:
        inputString = re.sub(r'\s+', ' ', inputString).replace("(", " ( ").replace(")", " ) ").split(' ')
        inputString = [element for element in inputString if element != '']
        return inputString
    else:
        return []
    
def findMatchingParenthesis(tokenList, index):
    count = 1
    for i in range(index+1, len(tokenList)):
        if tokenList[i] == '(':
            count += 1
        elif tokenList[i] == ')':
            count -= 1     
        if count == 0:
            return i

def buildTree(inputList:list[str]) -> list:

    # if inputList == [], return the empty list
    if len(inputList) == 0:
        return []
    
    # we have something in inputList, create a Node
    node = Node([]) # need [] inside Node init to ensure empty children list when created
    node.data = inputList[0]

    # if the first token is not '(', it is a single literal
    if inputList[0] != '(':

        # create Node where Node.data is the literal and continue processing the rest of input
        return [node] + buildTree(inputList[1:len(inputList)])
    
    if inputList[0] == '(' and inputList[1] == ')':
        
        # special case for the empty list '()', just modify Node.data == '()'
        node.data += inputList[1]

        # continue processing the rest of input
        return [node] + buildTree(inputList[2:len(inputList)])
    
    # we have '(' as the first token, find the index of its matching ')'
    matchIndex = findMatchingParenthesis(inputList,0)

    # if everything else is contained within our parenthesis pair, they will be contained in Node.children
    if matchIndex + 1 == len(inputList):
        node.children = buildTree(inputList[1:-1])
        return [node]
    
    # there are multiple elements in our list, create a Node/subtree for things in that list, append all to Node.children
    node.children += buildTree(inputList[1:matchIndex])

    # continue processing the rest of input
    return [node] + buildTree(inputList[matchIndex+1:len(inputList)])
        
    