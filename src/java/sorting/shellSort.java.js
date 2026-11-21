export const SHELL_SORT_JAVA = {
  fileName: 'ShellSort.java',
  className: 'ShellSort',
  code: `public class ShellSort {
    public static void shellSort(int[] arr) {
        int n = arr.length;
        // Start with a large gap, then reduce gap by half
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // Gapped insertion sort for this gap size
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;
                // Shift earlier elements until correct location is found
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                // Put temp in its correct location
                arr[j] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] data = { 12, 34, 54, 2, 3 };
        shellSort(data);
        System.out.println(java.util.Arrays.toString(data));
    }
}`,
  lineMap: {
    GAP_LOOP: 5,
    OUTER_LOOP: 7,
    STORE_TEMP: 8,
    COMPARE: 11,
    SHIFT: 12,
    INSERT: 15,
    FINISHED: 18
  }
};
