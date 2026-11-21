export const LINEAR_SEARCH_JAVA = {
  fileName: 'LinearSearch.java',
  className: 'LinearSearch',
  code: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        int n = arr.length;
        // Sequentially iterate through every array index
        for (int i = 0; i < n; i++) {
            // Compare current element with target
            if (arr[i] == target) {
                return i; // Target found at index i
            }
        }
        return -1; // Target not found in array
    }

    public static void main(String[] args) {
        int[] data = { 10, 50, 30, 70, 80, 20 };
        int target = 30;
        int result = linearSearch(data, target);
        System.out.println("Element index: " + result);
    }
}`,
  lineMap: {
    LOOP: 5,
    COMPARE: 7,
    FOUND: 8,
    NOT_FOUND: 11
  }
};
