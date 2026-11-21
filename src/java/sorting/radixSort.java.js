export const RADIX_SORT_JAVA = {
  fileName: 'RadixSort.java',
  className: 'RadixSort',
  code: `public class RadixSort {
    private static int getMax(int[] arr, int n) {
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    private static void countSort(int[] arr, int n, int exp) {
        int[] output = new int[n];
        int[] count = new int[10];

        // Store count of occurrences of digits
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // Cumulative sum for bucket positions
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array from right to left
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy sorted pass back to original array
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }

    public static void radixSort(int[] arr) {
        int max = getMax(arr, arr.length);
        // Process each digit place (1s, 10s, 100s...)
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countSort(arr, arr.length, exp);
        }
    }

    public static void main(String[] args) {
        int[] data = { 170, 45, 75, 90, 802, 24, 2, 66 };
        radixSort(data);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    GET_MAX: 3,
    EXP_LOOP: 39,
    COUNT_BUCKET: 15,
    CUMULATIVE_COUNT: 20,
    BUILD_OUTPUT: 25,
    COPY_BACK: 31,
    FINISHED: 42
  }
};
