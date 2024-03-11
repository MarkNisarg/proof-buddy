from Expression import ExpressionIdentifier, Expression
from enum import Enum

class ERBaseType(Enum):
    Error = 0
    Literal = 1
    List = 2
    Function = 3
    Any = 4

class ERType(Expression):
    def __init__(self, expression:Expression, type:'ERTypeIdentifier'):
        self.id = type
        self.expression = expression

class ERTypeIdentifier(ExpressionIdentifier):
    def __init__(self, name:str, input_types:list['ERTypeIdentifier'], output_type:'ERTypeIdentifier',
                 structure:list[ExpressionIdentifier], eval:function, baseType:ERBaseType) -> 'ERTypeIdentifier':
        self.name = name
        self.expressionType = ExpressionIdentifier(name, structure)
        self.input_types = input_types
        self.output_type = output_type
        self.eval = eval
        self.baseType = baseType

        if eval.__code__.co_argcount != len(input_types):
            print('Number of input types does not match lambda expression')
            return
        if eval.__code__.co_argcount != 0 and len(input_types)+3 != len(structure):
            print('Number of inputs given does not match number specified by lambda expression')
            return
    
    @staticmethod
    def create_Error(name:str,eval:function) -> 'ERTypeIdentifier':
        return ERTypeIdentifier(name,None,None,None,eval,ERBaseType.Error)
        
    @staticmethod
    def create_Literal(name:str,structure:list[ExpressionIdentifier],eval:function) -> 'ERTypeIdentifier':
        return ERTypeIdentifier(name,None,None,structure,eval,ERBaseType.Literal)
    
    @staticmethod
    def create_Function(name:str,input_types:list['ERTypeIdentifier'],output_type:'ERTypeIdentifier',
                        structure:list[ExpressionIdentifier],eval:function) -> 'ERTypeIdentifier':
        return ERTypeIdentifier(name,input_types,output_type,structure,eval,ERBaseType.Function)
    
    @staticmethod
    def create_List(name:str,input_types:list['ERTypeIdentifier'],
                    structure:list[ExpressionIdentifier])-> 'ERTypeIdentifier':
        return ERTypeIdentifier(name,input_types,None,structure,None,ERBaseType.List)

    def evaluate(self):
        return self.eval(self.structure[2:len(self.structure)-2])

    def __eq__(self, other:'ERTypeIdentifier') -> bool:
        return self.name == other.name
