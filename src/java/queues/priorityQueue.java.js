export const PRIORITY_QUEUE_JAVA = {
  fileName: 'PriorityQueueList.java',
  className: 'PriorityQueueList',
  code: `public class PriorityQueueList {
    static class Node {
        int data;
        int priority; // Lower value denotes higher priority
        Node next;
        Node(int d, int p) { data = d; priority = p; next = null; }
    }

    private Node head = null;

    public boolean isEmpty() { return head == null; }

    // Enqueue node maintaining sorted priority order
    public void enqueue(int data, int priority) {
        Node newNode = new Node(data, priority);
        if (head == null || priority < head.priority) {
            newNode.next = head;
            head = newNode;
            return;
        }
        Node curr = head;
        while (curr.next != null && curr.next.priority <= priority) {
            curr = curr.next;
        }
        newNode.next = curr.next;
        curr.next = newNode;
    }

    // Dequeue highest priority element (at head)
    public int dequeue() {
        if (isEmpty()) throw new IllegalStateException("Priority Queue Underflow!");
        int val = head.data;
        head = head.next;
        return val;
    }

    public int peek() {
        if (isEmpty()) throw new IllegalStateException("Priority Queue Empty!");
        return head.data;
    }
}`,
  lineMap: {
    ENQUEUE_HEAD: 18,
    ENQUEUE_TRAVERSE: 23,
    ENQUEUE_INSERT: 25,
    DEQUEUE_REMOVE: 32,
    PEEK: 38
  }
};
