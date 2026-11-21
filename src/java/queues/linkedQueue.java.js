export const LINKED_QUEUE_JAVA = {
  fileName: 'LinkedQueue.java',
  className: 'LinkedQueue',
  code: `public class LinkedQueue {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; this.next = null; }
    }

    private Node front = null;
    private Node rear = null;

    public boolean isEmpty() {
        return front == null;
    }

    // Enqueue node at rear
    public void enqueue(int value) {
        Node newNode = new Node(value);
        if (isEmpty()) {
            front = rear = newNode;
            return;
        }
        rear.next = newNode;
        rear = newNode;
    }

    // Dequeue node from front
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue Underflow!");
        }
        int val = front.data;
        front = front.next;
        if (front == null) rear = null;
        return val;
    }
}`,
  lineMap: {
    ENQUEUE_CREATE: 17,
    ENQUEUE_EMPTY: 19,
    ENQUEUE_LINK: 22,
    DEQUEUE_CHECK: 28,
    DEQUEUE_UNLINK: 32
  }
};
