from __future__ import annotations
from Token import Token, TokenIdentifier
from enum import Enum
from copy import deepcopy

_DEBUG = False

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

    def __str__(self) -> str:
        if _DEBUG:
            return f'{self.components}'
        else:
            s = ''
            for c in self.components:
                s += f'{c}'
            return s
    
    def __repr__(self) -> str:
        return f'{type(self).__name__}({self.id},{self.components})'

    def __eq__(self, other:Expression) -> bool:
        if not isinstance(other, Expression):
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
        # structure is only a single depth list and needs to be wrapped to form a double list
        if isinstance(structure,list) and not isinstance(structure[0],list):
            self.structure = [self.structure]
        # This property is for handling ORing multiple identifiers together
        self.ORing_operands = [self]

    def match(self:ExpressionIdentifier, inputLine:list[Token|Expression])\
        -> tuple[Expression|None, list[Token|Expression]]:
        # If this is not a ORed EI and we can perform a regular match
        if len(self.ORing_operands) == 1:
            # Has to match at least one of the sequences that defines this EI
            for seq in self.structure:
                hasMatch = True
                if len(seq) > len(inputLine):
                    hasMatch = False
                    break
                for j in range(len(seq)):
                    # If the current element in inputLine has to match 'Any', just skip and check the next
                    # if isinstance(inputLine[j],Expression) and seq[j] == 'Any':
                    #     continue
                    # If the current element in inputLine is a subexpression and the sequence is not expecting one
                    # (implied from previous check), or the current element just simply doesn't match the sequence'
                    # expected item, break and say we failed
                    if inputLine[j].id != seq[j]:
                        hasMatch = False
                        break
                # If we found a match, extract and return it and the rest of the line
                if hasMatch:
                    found_expr = Expression(self, inputLine[0:len(seq)])
                    rest_of_line = inputLine[len(seq):len(inputLine)]
                    return found_expr, rest_of_line
            return None, inputLine
        # This is then an ORed EI and we need to see if at least one of the operands has a match
        for operand in self.ORing_operands:
            if isinstance(operand,ExpressionIdentifier):
                match, rest_of_line = operand.match(inputLine)
            elif isinstance(operand,TokenIdentifier):
                if inputLine[0].id == operand:
                    match = operand
                    rest_of_line = inputLine[1:len(inputLine)]
                else:
                    match = None
            if match != None:
                return match, rest_of_line
        return None, inputLine

    def __str__(self) -> str:
        return self.name
    
    def __repr__(self) -> str:
        return f'{type(self).__name__}({self.name},{self.structure})'
    
    def __or__(self, other:ExpressionIdentifier|TokenIdentifier) -> ExpressionIdentifier:
        # ORed_expressionIdentifier = ExpressionIdentifier(f'{self.name}|{other.name}',self.structure+other.structure)
        # ORed_expressionIdentifier.ORing_operands = [deepcopy(self),deepcopy(other)]
        return ExpressionIdentifier(f'{self.name}|{other.name}',self.structure+other.structure)
    
    def __eq__(self,other:ExpressionIdentifier|TokenIdentifier) -> bool:
        if other == 'Any':
            return True
        elif len(self.ORing_operands) == 1 and len(other.ORing_operands) == 1:
            return self.name == other.name
        for e in self.ORing_operands:
            for e2 in other.ORing_operands:
                if e == e2:
                    return True
        return False