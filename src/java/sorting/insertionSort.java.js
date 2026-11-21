export const INSERTION_SORT_JAVA = {
  fileName: 'InsertionSort.java',
  className: 'InsertionSort',
  code: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Compare key with elements to its left
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            // Insert key into its correct sorted location
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] data = { 64, 34, 25, 12, 22, 11, 90 };
        insertionSort(data);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    OUTER_LOOP: 4,
    SELECT_KEY: 5,
    COMPARE: 9,
    SHIFT: 10,
    INSERT_KEY: 14,
    FINISHED: 16
  }
};
