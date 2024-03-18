# This file parses an input Racket string and converts it to an equivalent expression tree representation (called an AST)

import string # for string helper functions
from typeFile import * # import RacType for type hints
from ERobj import *  # for accessing pdict and ERObj declarations in applyRule

# SYMBOLS: perhaps in future allow square brackets and braces. 
WHITESPACE = ["\n","\t","\r"," "] # permits linebreak and indents for conditionals. all become \s in pre-processing step
ARITHMETIC = ["+","*","-","=",">","<"] # any other math uses ascii, such as expt, quotient, remainder. Note: "/" not permitted
OPEN_GROUP = ["(","[","{","'"] # needed to separate open from closed for more precision with error messaging. note ' should be '( but preproc uses char
CLOSE_GROUP = [")","]","}"] # possibly cond might be implemented one day with square brackets. presently, all these replaced by parens in pre-processing
SPECIAL_CHARS = ["#","?","\u03BB","'"] # hashtag for bools,? for pred suffix, unicode is for λ (currently not in language), single quote for quoted lists
AllowedChars = list(string.ascii_letters) + list(string.digits) + WHITESPACE + ARITHMETIC + OPEN_GROUP + CLOSE_GROUP + SPECIAL_CHARS

# Node object used to compose the AST
class Node:
    def __init__(self, children=None, parent=None, data:str='', tokenType:RacType=RacType((None,None)), name=None, debug:bool=False, numArgs:int=None, length:int=None, startPosition=None):
        self.children = children # by specification, children[0] is the "operator" for functions
        if children == None:
            self.children = []
        self.parent = parent # reference to the Node's parent (will be None for the root Node)
        self.data = data # this is the string name to be displayed (what used to be called "name" in the old PB)
        self.name = name # this is what used to be called "value" in the old PB
        self.type = tokenType # type of the node, (ex. boolean, int, function, etc.), specification described in typeFile
        self.debug = debug # False = standard execution, True = print info useful when debugging the pipeline
        self.numArgs = numArgs # for functions, it's the number of inputs
        self.length = length # for lists, it's the length
        self.startPosition = startPosition # starting position index of Node.data in the preprocessed string

    # Node.type attribute getter
    @property
    def type(self):
        return self._type
    
    # Node.type attribute setter
    @type.setter
    def type(self, newType):
        self._type = newType

    # convert the Node into a representation that is printed to the console
    def __str__(self):

        # print any unassigned type info during debugging
        if self.type == None and self.debug:
            outStr = f'{self.children}, {self.data}'
            print(outStr)

        # print value and type of each Node object, and a whitespace character for readability
        if self.debug:
            ans = f'{self.name},{self.type},{self.startPosition} '
        else:
            ans = self.data # print standardized syntax
        
        # print the Node's children if there are any
        if len(self.children) > 0:
            for i in range(len(self.children)):
                if i == len(self.children)-1 or self.debug:
                    ans += str(self.children[i])
                else:
                    ans += str(self.children[i]) + ' '
            ans += ')'
        return ans
    
    # this sets every node in the tree to the same debug setting
    def fullDebug(self, setting:bool):  
        if self!=None:
            self.debug=setting
            for c in self.children:
                c.fullDebug(setting)
        return

    # a node's setter method which takes in a string and sets the type of the node based on the string
    def setType(self, strg:str)->None:
        if ">" not in strg:
            self.type=RacType((None,Type.__members__.get(strg)))
        else:
            # make a "token list"
            slist = strg.upper().replace("(", " ( ").replace(">", " > ").replace(",", " , ").replace(")", " ) ").strip().split()
            if (ind:=findDelim(">",slist)) == -1:
                self.type=RacType(Type.ERROR) # e.g. mismatched parens
            else:
                outlist = slist[ind+1:] #everything after the >
                outtype = list2Type(outlist)
                domsList = slist[:ind] #everything before the >
                domsTup = list2Tup(domsList) # 
        return
     
    def applyRule(self, ruleID:str, errLog=None): #TODO: replace with dictionary
        if errLog==None:
            errLog=[]
        rules = {'if':self.ruleIf, 'cons':self.ruleCons, 'first':self.ruleFirst, 'rest':self.ruleRest, 'null':self.ruleNull, 'cons?':self.ruleConsQ, 'zero':self.ruleZero}
        return rules[ruleID](errLog)

    def ruleIf(self, errLog, debug=False):
        if (len(self.children) != 0 and self.children[0].data != 'if'):
            errLog.append(f'Cannot apply if rule to {self.children[0].data}')
        elif (len(self.children) != 4):
            errLog.append(f'If rule expects 4 arguments, but received {len(self.children)}')
            if debug:
                if len(self.children) != 0:
                    print("child[0] data:",self.children[0].data)
                print("length of children: ",len(self.children))
        else:
            condition = self.children[1]
            xNode = self.children[2]
            yNode = self.children[3]
            if condition.data == '#t':
                self.replaceNode(xNode)
            elif condition.data == '#f':
                self.replaceNode(yNode)
            elif isMatch(xNode, yNode): 
                self.replaceNode(xNode)
        return errLog

    def replaceNode(self, newNode): #is there a better way to do this?
        self.data = newNode.data
        self.name = newNode.name
        self.type = newNode.type
        self.numArgs = newNode.numArgs
        self.length = newNode.length
        self.children = newNode.children
        self.debug = newNode.debug
        #do NOT change self.parent, to maintain place in tree

    def ruleCons(self, errLog, debug=False):
        if self.children[0].data != 'cons':
            errLog.append(f'Cannot apply cons rule to {self.children[0].data}')
        elif self.children[1].children[0].data != 'first' and self.children[2].children[0].data != 'rest':
            errLog.append(f'Can only apply the cons rule to first and rest')
        elif not isMatch(self.children[1].children[1], self.children[2].children[1]):
            errLog.append(f'Cannot apply cons rule on two different lists')
        else:
            lNode = self.children[1].children[1]
            self.replaceNode(lNode)
        return errLog

    def ruleFirst(self, errLog, debug=False):
        if self.children[0].data != 'first':
            errLog.append(f'Cannot apply first rule to {self.children[0].data}')
        elif self.children[1].children[0].data != 'cons':
            errLog.append(f'first can only be applied to the cons rule')
        else:
            xNode = self.children[1].children[1]
            self.replaceNode(xNode)
        return errLog

    def ruleRest(self, errLog, debug=False):
        if self.children[0].data != 'rest':
            errLog.append(f'Cannot apply rest rule to {self.children[0].data}')
        elif self.children[1].children[0].data != 'cons':
            errLog.append(f'rest can only be applied to the cons rule')
        else:
            lNode = self.children[1].children[2]
            self.replaceNode(lNode)
        return errLog
    
    def ruleNull(self, errLog, debug=False):
        if self.children[0].data != 'null?':
            errLog.append(f'Cannot apply null rule to {self.children[0].data}')
        elif self.children[1].children[0].data != 'cons':
            errLog.append(f'null can only be applied to the cons rule')
        else:
            falseNode = Node(data='#f', tokenType=RacType((None, Type.BOOL)), name=False)
            self.replaceNode(falseNode)
        return errLog
    
    def ruleConsQ(self, errLog, debug=False):
        if self.children[0].data != 'cons?':
            errLog.append(f'Cannot apply cons? rule to {self.children[0].data}')
        elif self.children[1].children[0].data != 'cons':
            errLog.append(f'cons? can only be applied to the cons rule')
        else:
            trueNode = Node(data='#t', tokenType=RacType((None, Type.BOOL)), name=True)
            self.replaceNode(trueNode)
        return errLog
    
    def ruleZero(self, errLog, debug=False):
        if self.children[0].data != 'zero?':
            errLog.append(f'Cannot apply zero rule to {self.children[0].data}')
        elif self.children[1].children[0].data != '+':
            errLog.append(f'zero? can only be applied to addition rule')
        else:
            try:
                argOne = int(self.children[1].children[1].data)
                argTwo = int(self.children[1].children[2].data)
                if (argOne >=0 and argTwo >= 0) and (argOne > 0 or argTwo > 0):
                    falseNode = Node(data='#f', tokenType=RacType((None, Type.BOOL)), name=False)
                    self.replaceNode(falseNode)
            except:
                errLog.append("ValueError in ruleZero - argument for + not a valid int")
        return errLog
    
    def generateRacketFromRule(self, startPos, rule, errLog):
        if self.startPosition == startPos:
            return self.applyRule(rule)
        
        for child in self.children:
            return child.generateRacketFromRule(startPos, rule, errLog)
        
        errLog.append(f'Could not find Token with starting index {startPos}')
        return errLog
    
    #Old expression evaluation func, mistakenly called applyRule before - very incomplete
    #def evalExpression(self):
        # if (self.children[0].data in pdict): #for pre-defined functions
        #     operator = self.children[0].data
        #     erObj = pdict[operator]
        #     inputs = []
        #     for child in self.children[1:]: #converting to bools or ints so calculation can be done
        #         if child.data == '#t':
        #             inputs.append(True)
        #         elif child.data == '#f':
        #             inputs.append(False)
        #         elif child.type == Type.PARAM:
        #             inputs.append(child.data)
        #         else:
        #             inputs.append(int(child.data)) #any other type - any missing?
        #     if erObj.value: #if operation is defined in the ERobj, eg for arithmetic or boolean operations
        #         output = erObj.value(*inputs)
        #         return output
        #     else: #if, cons, first, rest, null, lambda
        #         if operator == 'first':
        #             return inputs[0]
        #         if operator == 'rest':
        #             return inputs[1:] #list of the remaining inputs
        #         if operator == 'if':
        #             if inputs[0]:
        #                 return inputs[1]
        #             else:
        #                 return inputs[2]

                
# a helper function for setType that returns the position in the list of the root delimiter (either > or ,)
def findDelim(delim:str, tlist:list)->int:
    counter=0 #checking for when parens first become balanced
    for i in range(len(tlist)): #must use range since index matters
        counter += 1 if tlist[i]=="(" else -1 if tlist[i]==")" else 0
        if counter == 0 and tlist[i]==delim:
            return i+1
    return -1 # the string had unbalanced parens or did not contain delim

#given a tokenized list of a single type (i.e. NOT a list of types like potentially in a domain), returns the ractype for it. note: could be a function
def list2Type(slist:list[str])->RacType:
    if ">" not in slist:
        strg = "".join(slist)
        if strg=="":
            return RacType(Type.ERROR)
        if strg[0]=="(":
            strg = str[1:-1] #cutting out any surrounding parens (note that strg is not a function, so an open parens isn't needed)
        return RacType((None,Type.__members__.get(strg)))
    return RacType() # TODO: this is what needs to be done if it is a function

# this takes in a list of parenthesized string tokens and splits it into ans[0]= token list of first element, ans[1]=token list of parenthesized rest
# example: "(INT,LIST,BOOL)" would be [INT, (LIST,BOOL)], all tokenized.  also [((INT,BOOL)>LIST, BOOL)] would be [(INT,BOOL)>LIST, (BOOL)]
def sepFirst(slist:list[str])->list:
    ind = findDelim(",",slist[1:-1]) #need to ignore out parens
    #if ind == -1:
     #   return [slist[1:-1],["(",")"]] #note this does not convert slist to a type with list2Type yet, it just removes the parens
    return [slist[1:ind],["("]+([")"] if ind==-1 else slist[ind+1:])]

def list2Tup(slist:list[str])->tuple:
    return () #TODO complete this

'''
do settype tests with:
INT>BOOL
(INT)>BOOL
(INT,LIST)>BOOL
(INT,LIST)>(INT>BOOL)
(INT,LIST)>INT>BOOL #note: this is same as above since > associates left to right
LIST>(INT)>BOOL
(INT)>(LIST>BOOL)
'''
        
# errLog is a list of strings of error messages that will be passed at each step of the tree-building process
def preProcess(inputString:str, errLog:list[str]=None, debug=False) -> tuple[list[str],list[str]]: # None will generate a warning since it's not a list of strings
    if errLog == None: # values assigned at func def, not each call, so need None vs []
        errLog = []

    #orig=inputString #saving original to refer to later, but might not be needed
    #inputString = inputString.lower()  #decided to permit uppercase letters and make it case sensitive to allow M vs m. caution: now  "If" is not "if"
    
    # standardize open/close grouping characters and whitespace
    inputString=inputString.replace("]",")").replace("[","(").replace("{","(").replace("}",")").replace("\t"," ").replace("\r"," ").replace("\n"," ").replace("("," ( ").replace(")"," ) ")
    inputString = " ".join(inputString.split()) # remove consecutive spaces, strip whitespace from front & back of inputString
    
    if inputString == "": # needed to avoid an issue in checking first character as (
        errLog.append("no input detected") # can't return the append directly since append changes in place and doesn't return a value!!
        return [], errLog
    # note that final replacement at end of next line attaches a \s to parens for list-splitting purposes
    
    # parentheses pairing check
    parenPairing = 0
    for ind in range(len(inputString)): # needed to loop over index values rather than char to know if not at end
        char = inputString[ind]

        # check if char is an allowed character
        if char not in AllowedChars:
            errLog.append(f"{char} not an allowed character")

        # parenPairing should only return to 0 at the very end of the input string
        if char == '(':
            parenPairing += 1
        elif char == ')':
            parenPairing -= 1

        # the following conditionals refer to the general lists of chars in case later developers decide not to the the replacements:
        # parentheses balanced in the interior of the string    
        if char in OPEN_GROUP[:-1] and parenPairing==1 and 0<ind<len(inputString)-1 \
            and ind-2>=0 and inputString[ind-2]!="'": #ommitting ' from open group and making sure the ( isn't a '(
            errLog.append("contains multiple independent subexpressions") #"(stuff)(stuff)".  need )( check to insure "34" doesn't trigger an error
        
        # separate values not wrapped in a list
        if char in WHITESPACE and inputString[0] not in OPEN_GROUP:
            errLog.append("multiple elements should be contained within a list") # "n n" will trigger an error
    
    # parentheses are not balanced in the input string 
    if parenPairing < 0:
        errLog.append("too many )")
    elif parenPairing > 0:
        errLog.append("too many (")
    
    # attaches single quote to left paren for quoted lists 
    inputString = inputString.replace("' (","'(")

    # return the list of standardized tokens, and the error log
    return inputString.split(),errLog

# helper function to find the index of the matching close parenthesis given the index of the open parenthesis    
def findMatchingParenthesis(tokenList, index) -> int:
    count = 1
    for i in range(index+1, len(tokenList)):
        if tokenList[i] == '(' or tokenList[i] == "'(":
            count += 1
        elif tokenList[i] == ')':
            count -= 1     
        if count == 0:
            return i
        
# algorithm to build the AST, composed of Node objects
def buildTree(inputList:list[str], debug=False) -> list:
    # if inputList == [], return the empty list
    if len(inputList) == 0:
        return [] 
    
    # we have something in inputList, create a Node
    node = Node([], debug=debug) # need [] inside Node init to ensure no children on instantiation
    node.data = inputList[0] # fill out the data with the symbol

    # if the first token is not '(', it is a single literal (ex. boolean, int, parameter)
    if inputList[0] != '(' and inputList[0]!="'(": #changed to accomodate quoted lists

        # create Node where Node.data is the literal and continue processing the rest of input
        return [node] + buildTree(inputList[1:len(inputList)], debug)
    
    # special case for the empty list '()', just modify Node.data == '()'
    if inputList[0] == "'(" and inputList[1] == ')': #changed to accomodate quotes
        node.data = 'null'

        # continue processing the rest of input
        return [node] + buildTree(inputList[2:len(inputList)], debug)

    # we have '(' as the first token, find the index of its matching ')'
    matchIndex = findMatchingParenthesis(inputList,0)

    # if everything else is contained within our parenthesis pair, they will be contained in Node.children
    if matchIndex + 1 == len(inputList):
        node.children = buildTree(inputList[1:-1], debug)

        # set the parent of each child node to be the (root) node
        for child in node.children:
            child.parent = node
        
        # return the (root) node
        return [node]
    
    # there are multiple elements in our list, create a Node/subtree for things in that list, append all to Node.children
    node.children += buildTree(inputList[1:matchIndex], debug)

    # set the parent of each child node to be the (root) node
    for child in node.children:
        child.parent = node

    # continue processing the rest of input
    return [node] + buildTree(inputList[matchIndex+1:len(inputList)], debug)

def isMatch(xNode:Node, yNode:Node)->bool: #recursively check if two nodes are identical #TODO: replace elif chain with something prettier
    if xNode.data != yNode.data:
        return False
    elif xNode.name != yNode.name:
        return False
    elif xNode.numArgs != yNode.numArgs:
        return False
    elif xNode.length != yNode.length:
        return False
    elif xNode.type != yNode.type:
        return False
    elif len(xNode.children) != len(yNode.children):
        return False
    elif len(xNode.children) != 0:
        checker = True
        for i in range(len(xNode.children)):
            if not isMatch(xNode.children[i], yNode.children[i]):
                checker = False
        if checker:
            return True
    else:
        return True #if everything else passed