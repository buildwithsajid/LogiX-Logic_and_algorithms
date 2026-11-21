export const POLYNOMIAL_ADDITION_JAVA = {
  fileName: 'PolynomialAddition.java',
  className: 'PolynomialAddition',
  code: `public class PolynomialAddition {
    static class PolyNode {
        int coeff;
        int exp;
        PolyNode next;
        PolyNode(int c, int e) { this.coeff = c; this.exp = e; }
    }

    // Add two polynomials represented by sorted linked lists
    public static PolyNode add(PolyNode p1, PolyNode p2) {
        PolyNode head = null, tail = null;

        while (p1 != null && p2 != null) {
            // Case 1: Exponents are equal, add coefficients
            if (p1.exp == p2.exp) {
                int sumCoeff = p1.coeff + p2.coeff;
                PolyNode term = new PolyNode(sumCoeff, p1.exp);
                if (head == null) head = tail = term;
                else { tail.next = term; tail = term; }
                p1 = p1.next; p2 = p2.next;
            }
            // Case 2: p1 exponent is higher
            else if (p1.exp > p2.exp) {
                PolyNode term = new PolyNode(p1.coeff, p1.exp);
                if (head == null) head = tail = term;
                else { tail.next = term; tail = term; }
                p1 = p1.next;
            }
            // Case 3: p2 exponent is higher
            else {
                PolyNode term = new PolyNode(p2.coeff, p2.exp);
                if (head == null) head = tail = term;
                else { tail.next = term; tail = term; }
                p2 = p2.next;
            }
        }
        return head;
    }
}`,
  lineMap: {
    COMPARE_EXP: 15,
    ADD_COEFF: 16,
    APPEND_TERM: 18,
    P1_HIGHER: 23,
    P2_HIGHER: 30
  }
};
