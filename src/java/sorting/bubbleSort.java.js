export const BUBBLE_SORT_JAVA = {
  fileName: 'BubbleSort.java',
  className: 'BubbleSort',
  code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap elements arr[j] and arr[j + 1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no elements were swapped, array is sorted
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] data = { 64, 34, 25, 12, 22, 11, 90 };
        bubbleSort(data);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    OUTER_LOOP: 5,
    INNER_LOOP: 7,
    COMPARE: 9,
    SWAP: 11,
    CHECK_SWAPPED: 18,
    FINISHED: 20
  }
};
