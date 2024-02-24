from Expression import Expression

# This class might not be necessary if we simply make the string representation
# construct itself from the layering of subproofs
class LineNumber(list):
    """
    This class will likely not be needed because I overcomplicated things by creating a TList that
    can only contain a single type of object. This will likely be replaced by a simple list of ints
    as there is no unique functionality that is required of this part that the Justification object
    cannot handle instead. I leave this explanation for completeness.
    """
    def __init__(self, iterable=None):
        super(LineNumber, self).__init__()
        if iterable:
            for item in iterable:
                self.append(item)

    def append(self, item):
        if isinstance(item, Expression):
            super(LineNumber, self).append(item)
        else:
            raise ValueError('This list only accepts expressions')

    def insert(self, index, item):
        if isinstance(item, Expression):
            super(LineNumber, self).insert(index, item)
        else:
            raise ValueError('This list only accepts expressions')

    def __add__(self, item):
        if isinstance(item, Expression):
            super(LineNumber, self).__add__(item)
        else:
            raise ValueError('This list only accepts expressions')

    def __iadd__(self, item):
        if isinstance(item, Expression):
            super(LineNumber, self).__iadd__(item)
        else:
            raise ValueError('This list only accepts expressions')
    
    def __str__(self):
        s = str(self[0])
        if self.count()>1:
            for i in range(1,self.count()-1):
                s += '.' + str(self[i])
        return s