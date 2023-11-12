class TList(list):
    def __init__(self, T:type, iterable=None):
        self.T = T
        super().__init__()
        if iterable:
            for item in iterable:
                if isinstance(item, T):
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
