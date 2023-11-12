import Expression

class Literal_expr(Expression):
    def __init__(self, label='A'):
        super(Literal_expr,self).__init__()
        if isinstance(label,str):
            self.token = label
        else:
            print('error')

    def __str__(self):
        return self.token