export const ARRAY_STACK_JAVA = {
  fileName: 'ArrayStack.java',
  className: 'ArrayStack',
  code: `public class ArrayStack {
    private int maxSize;
    private int[] stackArray;
    private int top;

    public ArrayStack(int size) {
        this.maxSize = size;
        this.stackArray = new int[maxSize];
        this.top = -1; // -1 denotes empty stack
    }

    public boolean isFull() {
        return top == maxSize - 1;
    }

    public boolean isEmpty() {
        return top == -1;
    }

    // Push element onto stack
    public void push(int value) {
        if (isFull()) {
            throw new IllegalStateException("Stack Overflow: Stack is full!");
        }
        stackArray[++top] = value;
    }

    // Pop element from stack
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack Underflow: Stack is empty!");
        }
        return stackArray[top--];
    }

    // Peek top element
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty!");
        }
        return stackArray[top];
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        System.out.println("Top: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
    }
}`,
  lineMap: {
    IS_FULL: 12,
    IS_EMPTY: 16,
    CHECK_OVERFLOW: 22,
    EXEC_PUSH: 25,
    CHECK_UNDERFLOW: 30,
    EXEC_POP: 33,
    PEEK: 40
  }
};
