# Extended by each specific type of expression (should be abstract)
class Expression:
    def __init__(self, subcomponents=[]):
        self.token = ''
        self.isRoot = False
        self.subcomponents = []
        for e in subcomponents:
            if isinstance(e, Expression):
                self.subcomponents += e

    def __str__(self):
        return self.token