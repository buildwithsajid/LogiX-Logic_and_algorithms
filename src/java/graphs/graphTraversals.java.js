export const GRAPH_TRAVERSALS_JAVA = {
  fileName: 'GraphTraversals.java',
  className: 'GraphTraversals',
  code: `import java.util.*;

public class GraphTraversals {
    private int V;
    private List<List<Integer>> adj;

    public GraphTraversals(int vertices) {
        this.V = vertices;
        adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
    }

    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }

    // Breadth-First Search (BFS) using Queue
    public void BFS(int startVertex) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();

        visited[startVertex] = true;
        queue.add(startVertex);

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            System.out.print(curr + " ");

            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }

    // Depth-First Search (DFS) using Recursion / Call Stack
    public void DFS(int startVertex) {
        boolean[] visited = new boolean[V];
        dfsHelper(startVertex, visited);
    }

    private void dfsHelper(int u, boolean[] visited) {
        visited[u] = true;
        System.out.print(u + " ");

        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfsHelper(v, visited);
            }
        }
    }
}`,
  lineMap: {
    BFS_START: 22,
    BFS_QUEUE_POLL: 26,
    BFS_NEIGHBOR_VISIT: 30,
    DFS_START: 40,
    DFS_VISIT: 45,
    DFS_RECURSE: 49
  }
};
