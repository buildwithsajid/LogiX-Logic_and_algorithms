export const CIRCULAR_QUEUE_JAVA = {
  fileName: 'CircularQueue.java',
  className: 'CircularQueue',
  code: `public class CircularQueue {
    private int capacity;
    private int[] queue;
    private int front;
    private int rear;
    private int count;

    public CircularQueue(int size) {
        this.capacity = size;
        this.queue = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    public boolean isFull() {
        return count == capacity;
    }

    public boolean isEmpty() {
        return count == 0;
    }

    // Circular Enqueue with wrap-around modulo
    public void enqueue(int item) {
        if (isFull()) {
            throw new IllegalStateException("Circular Queue Overflow!");
        }
        rear = (rear + 1) % capacity;
        queue[rear] = item;
        count++;
    }

    // Circular Dequeue with wrap-around modulo
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Circular Queue Underflow!");
        }
        int item = queue[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }
}`,
  lineMap: {
    IS_FULL: 16,
    IS_EMPTY: 20,
    ENQUEUE_CHECK: 26,
    ENQUEUE_MODULO: 29,
    ENQUEUE_STORE: 30,
    DEQUEUE_CHECK: 37,
    DEQUEUE_EXTRACT: 40,
    DEQUEUE_MODULO: 41
  }
};
