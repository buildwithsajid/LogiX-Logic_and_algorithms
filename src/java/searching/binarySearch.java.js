export const BINARY_SEARCH_JAVA = {
  fileName: 'BinarySearch.java',
  className: 'BinarySearch',
  code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if target is present at mid
            if (arr[mid] == target) {
                return mid;
            }

            // If target greater, search right half
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                // If target smaller, search left half
                high = mid - 1;
            }
        }
        return -1; // Element not present
    }

    public static void main(String[] args) {
        int[] sortedData = { 10, 20, 30, 40, 50, 60, 70 };
        int target = 40;
        int result = binarySearch(sortedData, target);
        System.out.println("Element found at: " + result);
    }
}`,
  lineMap: {
    INIT_RANGE: 3,
    WHILE_LOOP: 6,
    CALC_MID: 7,
    COMPARE_EQ: 10,
    FOUND: 11,
    COMPARE_LT: 15,
    SHIFT_RIGHT: 16,
    SHIFT_LEFT: 19,
    NOT_FOUND: 22
  }
};
