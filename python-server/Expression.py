#from ExpressionType import ExpressionType
from Token import Token, TokenType


class Expression(Token):
    def __init__(self, type:'ExpressionType', subcomponents:list=[], token:str=''):
        self.type = type
        self.token = token
        self.isRoot = False
        self.subcomponents = []
        
        # self.type = 
        # if subcomponents and not subcomponents.T == 'Expression':
        #     print('Error')
        # else:
        self.subcomponents = subcomponents

    def __str__(self):
        s = ''
        for c in self.subcomponents:
            s += f'{c}'
        return s
    
    def __repr__(self):
        return f'{type(self).__name__}({self.type},{self.subcomponents},\'{self.token}\')'
    
class ExpressionType(TokenType):

    def __init__(self, name:str, structure:list):
        self.name = name
        self.structure = list[TokenType]
        for e in structure:
            if isinstance(e,TokenType):
                self.structure.append(e)
    
    def match(self:'ExpressionType', inputLine:list) -> (bool, int):
        for i in range(len(inputLine)-len(self.structure)+1):
            hasMatch = True
            for j in range(len(self.structure)):
                if isinstance(inputLine[i+j],Expression) and self.structure[j].generic:
                    continue
                if isinstance(inputLine[i+j],Expression) or self.structure[j].generic or \
                    inputLine[i+j].tokenType != self.structure[j]:
                        hasMatch = False
                        break
            if hasMatch:
                return (True, i)
        return (False, -1)
    
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.structure})'