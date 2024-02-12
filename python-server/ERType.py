from Expression import ExpressionIdentifier, Expression

class ERType(Expression):
    def __init__(self, expression:Expression, type:'ERTypeIdentifier'):
        self.id = type
        self.expression = expression

class ERTypeIdentifier(ExpressionIdentifier):
    def __init__(self, name:str, input_types:list['ERTypeIdentifier'], output_type:'ERTypeIdentifier',
                 structure:list[ExpressionIdentifier], eval:function) -> 'ERTypeIdentifier':
        self.name = name
        self.expressionType = ExpressionIdentifier(name, structure)
        self.input_types = input_types
        self.output_type = output_type
        self.eval = eval

        if eval.__code__.co_argcount != len(input_types):
            print('Number of input types does not match lambda expression')
            return
        if eval.__code__.co_argcount != 0 and len(input_types)+3 != len(structure):
            print('Number of inputs given does not match number specified by lambda expression')
            return

    def evaluate(self):
        return self.eval(self.structure[2:len(self.structure)-2])

    def __eq__(self, other:'ERTypeIdentifier') -> bool:
        return self.name == other.name
