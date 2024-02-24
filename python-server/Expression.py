from __future__ import annotations
from Token import Token, TokenIdentifier
from enum import Enum
from copy import deepcopy

# This will need to be replaced later
class RacketType(Enum):
    Error = 0
    Literal = 1
    List = 2
    Function = 3
    Any = 4

class Expression(Token):
    """
    An Expression is a group on Tokens that holds a particular value as a collection. They are typically
    created by the Parser class in the parse method where a list of ExpressionIdentifiers are matched against
    a sequence of Tokens. If a match is found, an Expression object is made with these Tokens stored in the
    components field, and the EI that identified the sequence as the id.
    """
    def __init__(self, id:ExpressionIdentifier, components:list[Token|Expression]):
        self.id = id
        self.components = components
        # self.output_type = id.output_type
        # self.input_types = id.input_types
        # self.eval = id.eval
        # self.baseType = id.baseType
    
    def evaluate(self):
        # return self.id.eval(self.components[2:len(self.components)-2])
        raise NotImplementedError()

    def __str__(self):
        s = ''
        for c in self.components:
            s += f'{c}'
        return s
    
    def __repr__(self):
        return f'{type(self).__name__}({self.id},{self.components})'

    def __eq__(self, other:Expression):
        if other == None:
            return False
        elif len(self.components) != len(other.components):
            return False
        else:
            if len(self.components) == 0:
                return self.id == other.id

            for i in range(len(self.components)):
                if self.components[i] != other.components[i]:
                    return False
            return True


class ExpressionIdentifier(TokenIdentifier):
    """
    The ExpressionIdentifier defines a sequence (or possibly multiple sequences) of TokenIdentifiers
    or othe EIs that collectively can be grouped to form an Expression object. These can be ORed together,
    like with TIs, so that another EI can be defined as a sequence such as [open_parens, eBool|eInt, closed_parens]
    including the ORed state as a single subexpression in the sequence, a single element. The Parser class should
    call hasMatch on each EI that it knows on the sequence of Tokens that it has and the method should
    return the EI that identified it so that in the case of ORed EIs or TIs it knows which specific one was
    the one that identified.
    """
    def __init__(self, name:str, structure:list[ExpressionIdentifier|TokenIdentifier]):
        self.name = name
        self.structure = structure
        if isinstance(structure,list) and not isinstance(structure[0],list):
            self.structure = [self.structure]
        # This property is for handling ORing multiple identifiers together
        self.ORing_operands = [self]
        # self.output_type = output_type
        # self.input_types = input_types
        # self.eval = eval
        # self.baseType = baseType
    
    # @staticmethod
    # def create_Error(name:str,eval:function) -> 'ExpressionIdentifier':
    #     return ExpressionIdentifier(name,None,RacketType.Error,None,eval,RacketType.Error)
        
    # @staticmethod
    # def create_Literal(name:str,structure:list['ExpressionIdentifier'],type:RacketType,
    #                    eval:function) -> 'ExpressionIdentifier':
    #     return ExpressionIdentifier(name,structure,type,None,eval,RacketType.Literal)
    
    # @staticmethod
    # def create_Function(name:str,structure:list['ExpressionIdentifier'],input_types:list['ExpressionIdentifier'],
    #                     output_type:'ExpressionIdentifier',eval:function) -> 'ExpressionIdentifier':
    #     return ExpressionIdentifier(name,structure,output_type,input_types,eval,RacketType.Function)
    
    # @staticmethod
    # def create_List(name:str,input_types:list['ExpressionIdentifier'],
    #                 structure:list['ExpressionIdentifier'])-> 'ExpressionIdentifier':
    #     return ExpressionIdentifier(name,structure,RacketType.List,input_types,None,RacketType.List)

    def match(self:ExpressionIdentifier, inputLine:list[Token|Expression]) -> Expression|None:
        if len(self.ORing_operands) == 1:
            for seq in self.structure:
                for i in range(len(inputLine)-len(seq)+1):
                    hasMatch = True
                    for j in range(len(seq)):
                        if isinstance(inputLine[i+j],Expression) and seq[j] == 'Any':
                            continue
                        if isinstance(inputLine[i+j],Expression) or seq[j] == 'Any' or \
                            inputLine[i+j].id != seq[j]:
                                hasMatch = False
                                break
                    if hasMatch:
                        found_expr = Expression(self, inputLine[i:i+len(seq)])
                        new_line = inputLine[0:i] + [found_expr] + inputLine[i+len(seq):len(inputLine)]
                        return found_expr, new_line
            return None, None
        for operand in self.ORing_operands:
            retVal = operand.match(inputLine)
            if retVal != None:
                return retVal
        return None, None

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.structure})'
    
    def __or__(self, other:ExpressionIdentifier|TokenIdentifier):
        ORed_expressionIdentifier = ExpressionIdentifier(f'{self.name}|{other.name}',None)
        ORed_expressionIdentifier.ORing_operands = [deepcopy(self),deepcopy(other)]
        return ORed_expressionIdentifier
    
    # def __eq__(self,other:ExpressionIdentifier|TokenIdentifier):
    #     if self == 'Any' or other == 'Any':
    #         return True
    #     elif len(self.ORing_operands) == 1 and len(other.ORing_operands) == 1:
    #         return self.name == other.name
    #     for e in self.ORing_operands:
    #         for e2 in other.ORing_operands:
    #             if e == e2:
    #                 return True
    #     return False