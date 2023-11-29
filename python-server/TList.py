from typing import TypeVar

_T = TypeVar("_T")

class TList(list[_T]):
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
            s += f'{self.__getitem__(0)!s}'
        for i in range(1,self.__len__()):
            s += f', {self.__getitem__(i)!s}'
        s += ']'
        return s
    
    def __repr__(self):
        s = f'{type(self).__name__}('
        if self.__len__() > 0:
            s += f'{self.__getitem__(0)!r}'
        for i in range(1,self.__len__()):
            s += f', {self.__getitem__(i)!r}'
        s += ']'
        return s
