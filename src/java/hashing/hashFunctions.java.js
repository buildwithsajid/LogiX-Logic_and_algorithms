export const HASH_FUNCTIONS_JAVA = {
  fileName: 'HashFunctions.java',
  className: 'HashFunctions',
  code: `public class HashFunctions {
    // 1. Modulo Division: h(k) = k mod m
    public static int moduloDivision(int key, int tableSize) {
        return Math.abs(key) % tableSize;
    }

    // 2. Direct Hashing: h(k) = k
    public static int directHash(int key) {
        return key;
    }

    // 3. Subtraction Hashing: h(k) = k - offset
    public static int subtractionHash(int key, int offset) {
        return key - offset;
    }

    // 4. Digit Extraction: Extract 1st and 3rd digits
    public static int digitExtraction(int key, int tableSize) {
        String s = String.valueOf(Math.abs(key));
        if (s.length() < 3) return Math.abs(key) % tableSize;
        int d1 = Character.getNumericValue(s.charAt(0));
        int d3 = Character.getNumericValue(s.charAt(2));
        return (d1 * 10 + d3) % tableSize;
    }

    // 5. Fold Shift: Divide into 2-digit chunks and sum
    public static int foldShift(int key, int tableSize) {
        int sum = 0, temp = Math.abs(key);
        while (temp > 0) {
            sum += temp % 100;
            temp /= 100;
        }
        return sum % tableSize;
    }

    // 6. Fold Boundary: Reverse outer chunks before adding
    public static int foldBoundary(int key, int tableSize) {
        int sum = 0, temp = Math.abs(key);
        int chunkCount = 0;
        while (temp > 0) {
            int chunk = temp % 100;
            if (chunkCount == 0 || temp < 100) {
                // Reverse 2-digit boundary chunk: e.g. 47 -> 74
                chunk = (chunk % 10) * 10 + (chunk / 10);
            }
            sum += chunk;
            temp /= 100;
            chunkCount++;
        }
        return sum % tableSize;
    }
}`,
  lineMap: {
    MODULO: 3,
    DIRECT: 8,
    SUBTRACTION: 13,
    DIGIT_EXTRACT: 18,
    FOLD_SHIFT: 27,
    FOLD_BOUNDARY: 37
  }
};
