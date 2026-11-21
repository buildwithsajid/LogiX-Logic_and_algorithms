export const DIJKSTRA_JAVA = {
  fileName: 'DijkstraShortestPath.java',
  className: 'DijkstraShortestPath',
  code: `import java.util.*;

public class DijkstraShortestPath {
    static class Edge {
        int target, weight;
        Edge(int t, int w) { target = t; weight = w; }
    }

    // Dijkstra algorithm finding single-source shortest paths
    public static int[] dijkstra(int V, List<List<Edge>> adj, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.add(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            int d = curr[1];

            if (d > dist[u]) continue;

            for (Edge edge : adj.get(u)) {
                // Relaxation step: if shorter path found, update
                if (dist[u] + edge.weight < dist[edge.target]) {
                    dist[edge.target] = dist[u] + edge.weight;
                    pq.add(new int[]{edge.target, dist[edge.target]});
                }
            }
        }
        return dist;
    }
}`,
  lineMap: {
    INIT_DIST: 12,
    PQ_ADD: 16,
    PQ_POLL: 19,
    RELAXATION: 27
  }
};
