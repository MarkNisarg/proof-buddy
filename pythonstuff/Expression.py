from TList import TList

# Instanced by each specific type of expression (should be abstract)
class Expression:
    def __init__(self, subcomponents:TList=TList('Expression',[]), token:str=''):
        self.token = token
        self.isRoot = False
        self.subcomponents = []
        if subcomponents and not subcomponents.T == 'Expression':
            print('Error')
        else:
            self.subcomponents = subcomponents

    def __str__(self):
        return self.token