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
    if len(inputList) == 0:
        return []
    node = Node([])
    node.data = inputList[0]
    if inputList[0] != '(':
        return [node] + buildTree(inputList[1:len(inputList)])
    if inputList[0] == '(' and inputList[1] == ')':
        node.data += inputList[1]
        return [node] + buildTree(inputList[2:len(inputList)])
    matchIndex = findMatchingParenthesis(inputList,0)
    if matchIndex + 1 == len(inputList):
        node.children = buildTree(inputList[1:-1])
        return [node]
    node.children += buildTree(inputList[1:matchIndex])
    return [node] + buildTree(inputList[matchIndex+1:len(inputList)])
        
    