from __future__ import annotations
from Token import Token, TokenIdentifier
from enum import Enum
from copy import deepcopy


class RacketType(Enum):
    Error = 0
    Literal = 1
    List = 2
    Function = 3
    Any = 4

class Expression(Token):
    def __init__(self, id:ExpressionIdentifier, components:list[str]):
        # consolidated elements of Expression into Token super class
        super().__init__(id, components)
        
        # self.output_type = id.output_type
        # self.input_types = id.input_types
        # self.eval = id.eval
        # self.baseType = id.baseType
    
    def evaluate(self):
        # return self.id.eval(self.components[2:len(self.components)-2])
        raise NotImplementedError()

    def __eq__(self, other:Expression):
        if other == None:
            return False
        elif len(self.regexMatch) != len(other.regexMatch):
            return False
        else:
            if len(self.regexMatch) == 0:
                return self.id == other.id

            for i in range(len(self.regexMatch)):
                if self.regexMatch[i] != other.regexMatch[i]:
                    return False
            return True


class ExpressionIdentifier(TokenIdentifier):
    def __init__(self, name:str, structure:list[list[TokenIdentifier|str]]):
        self.name = name
        self.structure = structure
        # This property is for handling ORing multiple identifiers together

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

    def match(self:ExpressionIdentifier, inputLine:list[Token|Expression]) -> list[Token|Expression] | Expression:
        # go through each structure of list of TokenIdentifiers or 'Any'
        for seq in self.structure:
            # number of characters matched, need to fix for debug accuracy but does not affect final output
            charCount = 0
            for i in range(len(seq)):
                # assume not matched a portion of the sequence of TokenIdentifiers or 'Any' string
                hasMatch = False

                # iterate over each Token object
                for j in range(len(inputLine)):
                    if not isinstance(inputLine[j], Expression):

                        # 'Any' should be only be in between the first and last token of the list
                        if seq[i] == 'Any' and j != 0 and j !=len(inputLine)-1:
                            charCount += 1
                            continue
                        # TokenIdentifier object checks if the current Token matches its pattern
                        elif seq[i].hasMatch(str(inputLine[j])):

                            # update if match is found
                            hasMatch = True
                            charCount += 1
                            break
                # we found a match, create an expression                   
                if hasMatch:

                    # create Expression object with its new label and string it matched
                    found_expr = Expression(self, [str(token) for token in inputLine[j:j+len(seq)]])

                    # if we matched the entire list, then we've created our final expression, return it
                    if charCount >= len(inputLine):
                        return [found_expr]
                    else:
                        # update the list of tokens to replace matched part with a single Expression object
                        inputLine = inputLine[0:j] + [found_expr] + inputLine[j+len(seq):len(inputLine)]
                        # print(inputLine) # print tokenList updates
        # if we have passed over every possible structure, return the current status of the list of Token/Expression objects
        return inputLine

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f'{type(self).__name__}({self.name},{self.structure})'
    
    def __or__(self, other:ExpressionIdentifier):
        # flattened out nested ExpressionIdentifiers
        ORed_expressionIdentifier = ExpressionIdentifier(f'{self.name}',self.structure + other.structure)
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