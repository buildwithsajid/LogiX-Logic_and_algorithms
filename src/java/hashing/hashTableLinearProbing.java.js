export const HASH_TABLE_PROBING_JAVA = {
  fileName: 'HashTableLinearProbing.java',
  className: 'HashTableLinearProbing',
  code: `import java.util.Arrays;

public class HashTableLinearProbing {
    private int capacity;
    private int[] keys;
    private int count;

    public HashTableLinearProbing(int cap) {
        this.capacity = cap;
        this.keys = new int[capacity];
        this.count = 0;
        Arrays.fill(this.keys, -1); // -1 indicates empty slot
    }

    // Hash function: modulo division
    public int hash(int key) {
        return Math.abs(key) % capacity;
    }

    // Insert with linear probing collision resolution
    public boolean insert(int key) {
        if (count == capacity) {
            System.out.println("Hash Table Full!");
            return false;
        }
        int index = hash(key);
        while (keys[index] != -1 && keys[index] != -2) { // -2 is deleted
            if (keys[index] == key) return false; // Duplicate
            index = (index + 1) % capacity; // Linear probe
        }
        keys[index] = key;
        count++;
        return true;
    }

    // Search key using linear probing
    public int search(int key) {
        int index = hash(key);
        int startIndex = index;
        while (keys[index] != -1) {
            if (keys[index] == key) return index; // Found
            index = (index + 1) % capacity;
            if (index == startIndex) break;
        }
        return -1; // Not found
    }
}`,
  lineMap: {
    HASH_CALC: 17,
    CHECK_FULL: 22,
    PROBE_LOOP: 27,
    PROBE_ADVANCE: 29,
    INSERT_SLOT: 31,
    SEARCH_START: 38,
    SEARCH_FOUND: 41,
    SEARCH_NOT_FOUND: 45
  }
};
