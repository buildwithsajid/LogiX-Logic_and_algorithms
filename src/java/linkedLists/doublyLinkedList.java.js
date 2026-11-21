export const DOUBLY_LINKED_LIST_JAVA = {
  fileName: 'DoublyLinkedList.java',
  className: 'DoublyLinkedList',
  code: `public class DoublyLinkedList {
    static class Node {
        int data;
        Node prev;
        Node next;
        Node(int data) { this.data = data; }
    }

    private Node head;
    private Node tail;

    // Append to end of DLL
    public void append(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = tail = newNode;
            return;
        }
        tail.next = newNode;
        newNode.prev = tail;
        tail = newNode;
    }

    // Forward Traversal (Head to Tail)
    public void traverseForward() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " <-> ");
            curr = curr.next;
        }
    }

    // Backward Traversal (Tail to Head)
    public void traverseBackward() {
        Node curr = tail;
        while (curr != null) {
            System.out.print(curr.data + " <-> ");
            curr = curr.prev;
        }
    }
}`,
  lineMap: {
    APPEND_CREATE: 14,
    APPEND_EMPTY: 15,
    APPEND_LINK_NEXT: 19,
    APPEND_LINK_PREV: 20,
    FORWARD_START: 26,
    FORWARD_NEXT: 29,
    BACKWARD_START: 35,
    BACKWARD_PREV: 38
  }
};
