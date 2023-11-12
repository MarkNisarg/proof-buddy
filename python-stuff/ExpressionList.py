import Expression

class ExpressionList(list):
    def __init__(self, iterable=None):
        """Override initializer which can accept iterable"""
        super(ExpressionList, self).__init__()
        if iterable:
            for item in iterable:
                self.append(item)

    def append(self, item):
        if isinstance(item, Expression):
            super(ExpressionList, self).append(item)
        else:
            raise ValueError('This list only accepts expressions')

    def insert(self, index, item):
        if isinstance(item, Expression):
            super(ExpressionList, self).insert(index, item)
        else:
            raise ValueError('This list only accepts expressions')

    def __add__(self, item):
        if isinstance(item, Expression):
            super(ExpressionList, self).__add__(item)
        else:
            raise ValueError('This list only accepts expressions')

    def __iadd__(self, item):
        if isinstance(item, Expression):
            super(ExpressionList, self).__iadd__(item)
        else:
            raise ValueError('This list only accepts expressions')