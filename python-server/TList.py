from typing import TypeVar

_T = TypeVar("_T")

# Currently these have to be instantiated as `list1 = TList[int](int,[])` to tell the
# linter the class (the first int) and allow python to know the class for actual type
# checking (the second int)
class TList(list[_T]):
    """
    This is meant to be an extention of list that can enforce a property that the list is homogeneous
    and only contains objects of a single set assigned type, in order to help with type safety,
    however this is considered bad practice within Python and is generally boiler plate that will not
    be needed as long as we pass the right objects to the right methods.
    """
    def __init__(self, type:_T, iterable=None):
        self.T = type
        super().__init__()
        if iterable:
            for item in iterable:
                if isinstance(item, self.T):
                    self.append(item)

    def append(self, item):
        if isinstance(item, self.T):
            super().append(item)
        else:
            raise TypeError(f'This list only accepts {self.T}')

    def insert(self, index, item):
        if isinstance(item, self.T):
            super(TList, self).insert(index, item)
        else:
            raise TypeError(f'This list only accepts {self.T}')

    # tlist = TList(int)
    # thing = tlist + 1
    def __add__(self, item):
        if isinstance(item, self.T):
            super().__add__(item)
        else:
            try:
                for e in item:
                    if isinstance(e,self.T):
                        self = TList(self.T, super().__add__([e]))
                return self
            except TypeError:
                raise TypeError(f'This list only accepts {self.T}')

    # tlist = TList(int)
    # tlist += 1
    def __iadd__(self, item):
        if isinstance(item, self.T):
            super().__iadd__(item)
        else:
            try:
                for e in item:
                    if isinstance(e,self.T):
                        super().__iadd__([e])
                return self
            except TypeError:
                raise TypeError(f'This list only accepts {self.T}')
    
    def __str__(self):
        s = '['
        if self.__len__() > 0:
            s += f'{self.__getitem__(0)!s}\n'
        for i in range(1,self.__len__()):
            s += f', {self.__getitem__(i)!s}\n'
        s += ']'
        return s
    
    def __repr__(self):
        s = f'{type(self).__name__}('
        if self.__len__() > 0:
            s += f'{self.__getitem__(0)!r}\n'
        for i in range(1,self.__len__()):
            s += f', {self.__getitem__(i)!r}\n'
        s += ')'
        return s
