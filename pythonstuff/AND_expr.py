import Expression

class AND_expr(Expression):
    def __init__(self, operands=[]):
        super(AND_expr, self).__init__(operands)
        self.token = '&'
        if len(self.subcomponents)<2:
            print('error')

    def __str__(self):
        s = self.subcomponents[0]
        for i in range(1,len(self.subcomponents)-1):
            s += self.token + self.subcomponents[i]
        return s