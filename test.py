# put your code here
class Queue():

  def __init__(self,limit=None):
    # put your code here
    self.Queue = []
    self.limit = limit

  def isEmpty(self):
    # put your code here
    return  len(self.Queue) == 0

  def length(self):
    # put your code here
    if(self.isEmpty()):
      return None
    return len(self.Queue)

  def enqueue(self, element):
    # put your code here
    if (len(self.Queue)== self.limit):
      print("limit reached")
    else: self.Queue.append(element)

  def dequeue(self):
    # put your code here
    if not self.isEmpty():
        self.Queue.pop(0)
    return None

  def front(self):
    # put your code here
    if self.isEmpty():
      return None
    return self.Queue[0]

  def rear(self):
    # put your code here
    if self.isEmpty():
      return None
    return self.Queue[-1]

  def print(self):
    # put your code here
    for elemnet in self.Queue:
      print(elemnet)


class Node:
    # Constructor to create a new node with a given value
    def __init__(self, value):
        # put your code here (3 lines of code)
      self.value = value
      self.right =None
      self.left = None


# put your code here
# 8 lines of code
root = Node(7)
node1 = root.left = Node(4)
node2 = root.right = Node(9)
# second lvel
node3 = node1.left = Node(2)
node4 = node1.right = Node(5)

node5 = node2.left = Node(8)
node6 = node2.right = Node(12)
# third level
node7 = node3.left = Node(0)

node8 = node6.right = Node(16)



def level_order(root):

    if not root:
        return

    my_queue = Queue()
    my_queue.enqueue(root)
    print(root.value)
    while my_queue !=[]:
      my_queue.dequeue()

      if root.left:
        print(root.left.value)
        my_queue.enqueue(root.left)

      if root.right:
        print(root.right.value)
        my_queue.enqueue(root.right)
        

level_order(root)