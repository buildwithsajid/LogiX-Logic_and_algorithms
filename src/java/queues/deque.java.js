export const DEQUE_JAVA = {
  fileName: 'DoubleEndedQueue.java',
  className: 'DoubleEndedQueue',
  code: `public class DoubleEndedQueue {
    private int capacity;
    private int[] deque;
    private int front;
    private int rear;
    private int count;

    public DoubleEndedQueue(int size) {
        this.capacity = size;
        this.deque = new int[capacity];
        this.front = -1;
        this.rear = 0;
        this.count = 0;
    }

    public boolean isFull() { return count == capacity; }
    public boolean isEmpty() { return count == 0; }

    // Insert at front
    public void insertFront(int val) {
        if (isFull()) throw new IllegalStateException("Deque Overflow!");
        if (front == -1) { front = rear = 0; }
        else if (front == 0) { front = capacity - 1; }
        else { front--; }
        deque[front] = val;
        count++;
    }

    // Insert at rear
    public void insertRear(int val) {
        if (isFull()) throw new IllegalStateException("Deque Overflow!");
        if (front == -1) { front = rear = 0; }
        else if (rear == capacity - 1) { rear = 0; }
        else { rear++; }
        deque[rear] = val;
        count++;
    }

    // Delete from front
    public int deleteFront() {
        if (isEmpty()) throw new IllegalStateException("Deque Underflow!");
        int val = deque[front];
        if (front == rear) { front = rear = -1; }
        else if (front == capacity - 1) { front = 0; }
        else { front++; }
        count--;
        return val;
    }

    // Delete from rear
    public int deleteRear() {
        if (isEmpty()) throw new IllegalStateException("Deque Underflow!");
        int val = deque[rear];
        if (front == rear) { front = rear = -1; }
        else if (rear == 0) { rear = capacity - 1; }
        else { rear--; }
        count--;
        return val;
    }
}`,
  lineMap: {
    INSERT_FRONT: 20,
    INSERT_REAR: 30,
    DELETE_FRONT: 40,
    DELETE_REAR: 51
  }
};
