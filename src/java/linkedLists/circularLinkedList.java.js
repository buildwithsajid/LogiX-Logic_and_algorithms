export const CIRCULAR_LINKED_LIST_JAVA = {
  fileName: 'CircularLinkedList.java',
  className: 'CircularLinkedList',
  code: `public class CircularLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    private Node head = null;
    private Node tail = null;

    // Insert at end maintaining circular pointer
    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
            newNode.next = head; // Points to self
        } else {
            tail.next = newNode;
            tail = newNode;
            tail.next = head; // Close circle to head
        }
    }

    // Traverse circular list once
    public void display() {
        if (head == null) return;
        Node current = head;
        do {
            System.out.print(current.data + " -> ");
            current = current.next;
        } while (current != head);
    }
}`,
  lineMap: {
    INSERT_NODE: 13,
    INSERT_EMPTY: 14,
    INSERT_LINK_TAIL: 19,
    INSERT_CLOSE_CYCLE: 21,
    TRAVERSE_START: 28,
    TRAVERSE_DO: 30,
    TRAVERSE_LOOP: 32
  }
};
