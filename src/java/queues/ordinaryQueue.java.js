export const ORDINARY_QUEUE_JAVA = {
  fileName: 'OrdinaryQueue.java',
  className: 'OrdinaryQueue',
  code: `public class OrdinaryQueue {
    private int capacity;
    private int[] queue;
    private int front;
    private int rear;

    public OrdinaryQueue(int size) {
        this.capacity = size;
        this.queue = new int[capacity];
        this.front = 0;
        this.rear = -1;
    }

    public boolean isFull() {
        return rear == capacity - 1;
    }

    public boolean isEmpty() {
        return front > rear;
    }

    // Enqueue element to rear
    public void enqueue(int item) {
        if (isFull()) {
            throw new IllegalStateException("Queue Overflow: Queue is full!");
        }
        queue[++rear] = item;
    }

    // Dequeue element from front
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue Underflow: Queue is empty!");
        }
        return queue[front++];
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty!");
        }
        return queue[front];
    }
}`,
  lineMap: {
    IS_FULL: 14,
    IS_EMPTY: 18,
    ENQUEUE_CHECK: 24,
    ENQUEUE_EXEC: 27,
    DEQUEUE_CHECK: 32,
    DEQUEUE_EXEC: 35,
    PEEK: 42
  }
};
