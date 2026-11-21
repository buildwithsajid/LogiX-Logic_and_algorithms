export const QUICK_SORT_JAVA = {
  fileName: 'QuickSort.java',
  className: 'QuickSort',
  code: `public class QuickSort {
    // Partition using Lomuto scheme (last element as pivot)
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            // Compare current element with pivot
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // Place pivot at its correct sorted position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] data = { 10, 80, 30, 90, 40, 50, 70 };
        quickSort(data, 0, data.length - 1);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    SELECT_PIVOT: 4,
    LOOP: 7,
    COMPARE: 9,
    SWAP: 12,
    PIVOT_SWAP: 18,
    RECURSE: 25,
    FINISHED: 30
  }
};
