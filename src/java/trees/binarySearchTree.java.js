export const BST_JAVA = {
  fileName: 'BinarySearchTree.java',
  className: 'BinarySearchTree',
  code: `public class BinarySearchTree {
    static class Node {
        int key;
        Node left, right;
        Node(int val) { key = val; left = right = null; }
    }

    private Node root = null;

    // Recursive Insertion
    public Node insert(Node curr, int key) {
        if (curr == null) return new Node(key);
        if (key < curr.key) curr.left = insert(curr.left, key);
        else if (key > curr.key) curr.right = insert(curr.right, key);
        return curr;
    }

    // Search Key
    public boolean search(Node curr, int key) {
        if (curr == null) return false;
        if (curr.key == key) return true;
        return key < curr.key ? search(curr.left, key) : search(curr.right, key);
    }

    // Find Smallest Node (Leftmost)
    public int findMin(Node curr) {
        if (curr == null) throw new IllegalStateException("Empty Tree!");
        while (curr.left != null) curr = curr.left;
        return curr.key;
    }

    // Find Largest Node (Rightmost)
    public int findMax(Node curr) {
        if (curr == null) throw new IllegalStateException("Empty Tree!");
        while (curr.right != null) curr = curr.right;
        return curr.key;
    }

    // Inorder Traversal (Left - Root - Right)
    public void inorder(Node curr) {
        if (curr != null) {
            inorder(curr.left);
            System.out.print(curr.key + " ");
            inorder(curr.right);
        }
    }

    // Preorder Traversal (Root - Left - Right)
    public void preorder(Node curr) {
        if (curr != null) {
            System.out.print(curr.key + " ");
            preorder(curr.left);
            preorder(curr.right);
        }
    }

    // Postorder Traversal (Left - Right - Root)
    public void postorder(Node curr) {
        if (curr != null) {
            postorder(curr.left);
            postorder(curr.right);
            System.out.print(curr.key + " ");
        }
    }

    // Count Total Nodes
    public int count(Node curr) {
        if (curr == null) return 0;
        return 1 + count(curr.left) + count(curr.right);
    }
}`,
  lineMap: {
    INSERT_BASE: 12,
    INSERT_LEFT: 13,
    INSERT_RIGHT: 14,
    SEARCH_FOUND: 20,
    SEARCH_RECURSE: 21,
    FIND_MIN: 27,
    FIND_MAX: 34,
    INORDER: 41,
    PREORDER: 50,
    POSTORDER: 59,
    COUNT: 68
  }
};
