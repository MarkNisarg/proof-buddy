from typeFile import Type

# this is a class that holds information that can be fed into the tree nodes
class ERobj:
    def __init__(self, name, pbType:Type, ins=None, outType=None, value=None, numArgs=None, length=None):
        self.name = name # the string label
        self.pbType = pbType # from PBtypes
        self.ins = ins #for functions, it's the tuple of input types
        self.outtype = outType # for functions, it's the output type
        self.numArgs = numArgs # for functions, it's the number of inputs
        self.length = length # for lists, it's the length 
        self.value = value # for ints/bools/lists this is a wrapper. for functions it's the lambda expression of it's def. 
        #value is the function that tells what happens when it gets evaluated
    def __str__(self):
        return str(self.name)
    def __eq__(self,other):
        if isinstance(other,ERobj): #TODO: possible issue with value if not primitive
                return self.name == other.name and self.pbType==other.pbType and \
                    self.ins==other.ins and self.outtype==other.outtype and \
                        self.numArgs==other.numArgs and self.length == other.length and \
                            self.value == other.value
        return False
 
#making deepcopies
def ERcopy(orig:ERobj)->ERobj:
    return ERobj(orig.name, orig.pbType, orig.ins, orig.outtype, orig.value,orig.numArgs, orig.length)


# NOTE: lambdas take the ERobj.value, as inputs, not the value itself.
# similarly, lambda output values, not the ERobjs. So, they will need to be
# unwrapped before being passed, and then wrapped up after the return before use.
# these ERobjects are what will be in the data attribute of the RacTree nodes

plist = ERobj("(", Type.LIST)
pcons = ERobj("cons", Type.FUNCTION, (Type.ANY,Type.LIST),Type.LIST,None,2)
prest = ERobj("rest", Type.FUNCTION, (Type.LIST),Type.LIST,None,1)
pfirst = ERobj("first", Type.FUNCTION, (Type.LIST),Type.ANY,None,1)
padd = ERobj("+", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x+y,2)
psubtr = ERobj("-", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x-y,2)
pmult = ERobj("*", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x*y,2)
pexpt = ERobj("expt", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x**y,2)
peq = ERobj("=", Type.FUNCTION, (Type.ANY,Type.ANY),Type.BOOL,lambda x,y: x==y,2)
pgtr = ERobj(">", Type.FUNCTION, (Type.INT,Type.INT),Type.BOOL,lambda x,y: x>y,2)
pgtreq = ERobj(">=", Type.FUNCTION, (Type.INT,Type.INT),Type.BOOL,lambda x,y: x>=y,2)
pless = ERobj("<", Type.FUNCTION, (Type.INT,Type.INT),Type.BOOL,lambda x,y: x<y,2)
plesseq = ERobj("<=", Type.FUNCTION, (Type.INT,Type.INT),Type.BOOL,lambda x,y: x<=y,2)
pquotient = ERobj("quotient", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x//y,2)
prem = ERobj("remainder", Type.FUNCTION, (Type.INT,Type.INT),Type.INT,lambda x,y: x%y,2)
pand = ERobj("and", Type.FUNCTION, (Type.BOOL,Type.BOOL),Type.BOOL,lambda x,y: x and y,2)
por = ERobj("or", Type.FUNCTION, (Type.BOOL,Type.BOOL),Type.BOOL,lambda x,y: x or y,2)
pnot = ERobj("not", Type.FUNCTION, (Type.BOOL,),Type.BOOL,lambda x: not x,1)
pxor = ERobj("xor", Type.FUNCTION, (Type.BOOL,Type.BOOL),Type.BOOL,lambda x,y: x!=y,2)
pimp = ERobj("implies", Type.FUNCTION, (Type.BOOL,Type.BOOL),Type.BOOL,lambda x,y: (not x) or y,2)
pnullPred = ERobj("null?", Type.FUNCTION, (Type.ANY,),Type.BOOL,lambda x: x==[],1)
pzeroPred = ERobj("zero?", Type.FUNCTION, (Type.ANY,),Type.BOOL,lambda x: x==0,1)
pintPred = ERobj("int?", Type.FUNCTION, (Type.ANY,),Type.BOOL,lambda x: isinstance(x,int),1)
# BUG: might be bug with quoted lists, so better to refer to ERobj.type ?
plistPred = ERobj("list?", Type.FUNCTION, (Type.ANY,),Type.BOOL,lambda x: isinstance(x,list),1)
pnull = ERobj("null", Type.LIST, None,None,[],None,0) # first time len attrib not None
ptrue = ERobj("#t", Type.BOOL,value=True) 
pfalse = ERobj("#f", Type.BOOL,value=False)

#unsure if we should make output be a special kind of list, or if reg list okay?
pquote = ERobj("'", Type.FUNCTION, (Type.LIST,),Type.LIST,[],1) 

# unicode for λ. and technically 2nd input arg should be "sexpr" but no such type
plambda = ERobj("\u03BB", Type.FUNCTION, (Type.LIST,Type.ANY),Type.FUNCTION,None,2)

# BAD IDEA b/c need new objects each time since diff childs: sexpr = ERobj("(", Type.LIST)

#note: the output type for "if" isn't quite correct. it's really = 3rd arg, not Type.ANY
pif = ERobj("if", Type.FUNCTION, (Type.BOOL,Type.ANY,Type.ANY),Type.ANY,None,3)

# for testing purposes
pfact = ERobj("fact",Type.FUNCTION,(Type.INT,),Type.INT,None, 1)

#possible problem if they name a variable ERROR, so make sure that gets reserved
#NOTE: this is from an old version, and has since been replaced by ErrLog (or is the original better?)
perr = ERobj("Error", Type.ERROR) # can use perr.value to store a string of specific error msg

# TODO: list of the core racket-lite functions (will need to change if add more )
pcore = [plist, pcons, prest, pfirst, padd, psubtr, pmult, pexpt, peq, pgtr, pgtreq,\
    pless, plesseq, pquotient, prem, pand, por, pnot, pxor, pimp, pnullPred,\
        pzeroPred,pintPred, plistPred, pnull, ptrue,pfalse,pquote,plambda,pif,perr]
ptests = [pfact]

# making a look-up table of ERobj by string name
pdict ={}
testDict={}
for x in pcore:
    pdict[x.name]=x
for x in ptests:
    testDict[x.name]=x