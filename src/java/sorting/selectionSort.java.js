export const SELECTION_SORT_JAVA = {
  fileName: 'SelectionSort.java',
  className: 'SelectionSort',
  code: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap minimum element with first unsorted element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] data = { 64, 25, 12, 22, 11 };
        selectionSort(data);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    OUTER_LOOP: 4,
    INIT_MIN: 6,
    INNER_LOOP: 7,
    COMPARE: 8,
    UPDATE_MIN: 9,
    SWAP: 13,
    FINISHED: 17
  }
};
