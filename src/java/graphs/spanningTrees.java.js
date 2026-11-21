export const SPANNING_TREES_JAVA = {
  fileName: 'MinimumSpanningTrees.java',
  className: 'MinimumSpanningTrees',
  code: `import java.util.*;

public class MinimumSpanningTrees {
    static class Edge implements Comparable<Edge> {
        int u, v, weight;
        Edge(int u, int v, int w) { this.u = u; this.v = v; this.weight = w; }
        public int compareTo(Edge o) { return Integer.compare(this.weight, o.weight); }
    }

    // Kruskal's Algorithm using Disjoint Set Union (DSU)
    public static List<Edge> kruskalMST(int V, List<Edge> edges) {
        Collections.sort(edges); // Sort edges by weight
        int[] parent = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;

        List<Edge> mst = new ArrayList<>();
        for (Edge e : edges) {
            int rootU = find(parent, e.u);
            int rootV = find(parent, e.v);
            if (rootU != rootV) {
                mst.add(e);
                parent[rootU] = rootV; // Union
                if (mst.size() == V - 1) break;
            }
        }
        return mst;
    }

    private static int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
  lineMap: {
    SORT_EDGES: 12,
    CHECK_CYCLE: 19,
    ADD_MST_EDGE: 20
  }
};
