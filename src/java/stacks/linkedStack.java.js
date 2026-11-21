export const LINKED_STACK_JAVA = {
  fileName: 'LinkedStack.java',
  className: 'LinkedStack',
  code: `public class LinkedStack {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; this.next = null; }
    }

    private Node top = null;
    private int size = 0;

    public boolean isEmpty() {
        return top == null;
    }

    // Push node to top of linked stack
    public void push(int value) {
        Node newNode = new Node(value);
        newNode.next = top;
        top = newNode;
        size++;
    }

    // Pop node from top of linked stack
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack Underflow!");
        }
        int poppedValue = top.data;
        top = top.next;
        size--;
        return poppedValue;
    }

    public int peek() {
        if (isEmpty()) throw new IllegalStateException("Stack Empty!");
        return top.data;
    }
}`,
  lineMap: {
    PUSH_NEW_NODE: 17,
    PUSH_LINK: 18,
    PUSH_UPDATE_TOP: 19,
    POP_CHECK: 25,
    POP_UNLINK: 29,
    PEEK: 35
  }
};
