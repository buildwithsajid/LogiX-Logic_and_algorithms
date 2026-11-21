export const HEAP_JAVA = {
  fileName: 'BinaryHeap.java',
  className: 'BinaryHeap',
  code: `public class BinaryHeap {
    private int[] heap;
    private int size;
    private boolean isMinHeap;

    public BinaryHeap(int capacity, boolean isMinHeap) {
        this.heap = new int[capacity];
        this.size = 0;
        this.isMinHeap = isMinHeap;
    }

    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }

    // Reheap Up (Bubble Up after Insertion)
    private void reheapUp(int index) {
        while (index > 0) {
            int p = parent(index);
            boolean violates = isMinHeap ? heap[index] < heap[p] : heap[index] > heap[p];
            if (violates) {
                int temp = heap[index];
                heap[index] = heap[p];
                heap[p] = temp;
                index = p;
            } else break;
        }
    }

    // Reheap Down (Sink Down after Deletion)
    private void reheapDown(int index) {
        while (leftChild(index) < size) {
            int target = leftChild(index);
            int right = rightChild(index);
            if (right < size) {
                boolean preferRight = isMinHeap ? heap[right] < heap[target] : heap[right] > heap[target];
                if (preferRight) target = right;
            }
            boolean violates = isMinHeap ? heap[target] < heap[index] : heap[target] > heap[index];
            if (violates) {
                int temp = heap[index];
                heap[index] = heap[target];
                heap[target] = temp;
                index = target;
            } else break;
        }
    }

    // Insert Element into Heap
    public void insert(int val) {
        heap[size] = val;
        reheapUp(size);
        size++;
    }

    // Delete Root Element (Extract Min / Max)
    public int extractRoot() {
        if (size == 0) throw new IllegalStateException("Heap Empty!");
        int rootVal = heap[0];
        heap[0] = heap[size - 1];
        size--;
        reheapDown(0);
        return rootVal;
    }
}`,
  lineMap: {
    REHEAP_UP_LOOP: 17,
    REHEAP_UP_SWAP: 21,
    REHEAP_DOWN_LOOP: 30,
    REHEAP_DOWN_SWAP: 39,
    INSERT: 50,
    EXTRACT: 58
  }
};
