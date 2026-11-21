export const SINGLY_LINKED_LIST_JAVA = {
  fileName: 'SinglyLinkedList.java',
  className: 'SinglyLinkedList',
  code: `public class SinglyLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; this.next = null; }
    }

    private Node head;

    // Insert node at the tail of the list
    public void insertTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Insert node at the head
    public void insertHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    // Delete node by value
    public boolean delete(int key) {
        if (head == null) return false;
        if (head.data == key) {
            head = head.next;
            return true;
        }
        Node current = head;
        while (current.next != null && current.next.data != key) {
            current = current.next;
        }
        if (current.next != null) {
            current.next = current.next.next;
            return true;
        }
        return false;
    }

    // In-place reverse singly linked list
    public void reverse() {
        Node prev = null;
        Node current = head;
        Node nextNode = null;
        while (current != null) {
            nextNode = current.next; // Store next
            current.next = prev;     // Reverse pointer
            prev = current;          // Advance prev
            current = nextNode;      // Advance current
        }
        head = prev;
    }
}`,
  lineMap: {
    INSERT_NEW_NODE: 12,
    INSERT_EMPTY_CHECK: 13,
    INSERT_TRAVERSE: 18,
    INSERT_LINK: 20,
    INSERT_HEAD: 26,
    DELETE_HEAD: 33,
    DELETE_TRAVERSE: 38,
    DELETE_UNLINK: 41,
    REVERSE_INIT: 49,
    REVERSE_STEP: 53,
    REVERSE_FINISH: 58
  }
};
