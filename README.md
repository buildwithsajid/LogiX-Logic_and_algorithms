# LogiX – Interactive Data Structures & Algorithms Lab

> **Tagline:** Visualize. Compare. Analyze. Experiment.

**LogiX** is a modern, responsive, developer-grade educational web platform designed for computer science students mastering Data Structures & Algorithms (DSA), featuring textbook-accurate **Java 21 LTS** as the primary educational language and an authentic client-side **JavaScript Execution Engine** driving synchronized visual animations.

---

## 🌟 Key Architecture & Features

### 1. 100% Frontend-Only Static Architecture
* **Zero Database & Zero Backend API**: Runs purely inside the browser with zero server overhead.
* **Instant Deployment**: Fully configured for one-click static hosting on **Vercel** (`vercel.json`) and **Netlify** (`public/_redirects`).
* **Privacy & Offline Capable**: All execution occurs client-side. No API keys or remote compilers required.

### 2. Dual-Engine Education Model (Java + JavaScript)
* **Java 21 LTS Reference Code**: Authentic university syllabus code with classes, methods, and line numbers.
* **Discrete Event Tracing**: The JavaScript visualization engine emits discrete operation events (`COMPARE`, `SWAP`, `SHIFT`, `PUSH`, `POP`, `REHEAP`, `RELAXATION`).
* **Line-by-Line Synchronization**: Source line mapping highlights the corresponding statement in the Java reference code in real time as each operation visualizes.

### 3. Complete Curriculum Coverage (All 8 Modules)
1. **Sorting & Searching**: Bubble, Insertion, Selection, Shell, Quick, Radix Sort (LSD) + Linear & Binary Search.
2. **Basic Linear Structures**: Array Stack, Linked Stack, Ordinary Queue, Circular Queue (modulo ring buffer), Double-Ended Queue (Deque), and Priority Queue.
3. **Linked Lists**: Singly, Doubly, and Circular Linked Lists with in-place pointer reversal and algebraic Polynomial Addition ($Ax^p + Bx^p$).
4. **Hashing Techniques**: Open addressing with Linear Probing and 6 hash functions (Modulo, Digit Extraction, Direct, Subtraction, Fold Shift, Fold Boundary).
5. **Trees & Heaps**: Binary Search Tree (Insert, Search, Delete, Inorder/Preorder/Postorder traversals) + Binary Min/Max Heap with Reheap Up/Down.
6. **Graph Algorithms**: 2D weighted visualizer, Adjacency Matrix, BFS, DFS, Dijkstra's Shortest Path, and Prim's & Kruskal's Minimum Spanning Tree (MST).
7. **Algorithm Race Arena**: Head-to-head concurrent execution of 2 to 4 sorting algorithms on identical datasets (Random, Nearly Sorted, Reversed, Few Unique) with operation counting ($C+S$) determining the champion.
8. **Complexity Analyzer**: Interactive Recharts asymptotic curves ($O(1)$ through $O(2^n)$) with logarithmic toggle, live empirical operation counting, and 21-item Master DSA Matrix.
9. **Java Reference Code Lab**: Dedicated hub featuring 22 textbook Java implementations with interactive line stepping and simulated terminal execution.
10. **JavaScript Code Analyzer**: Static Acorn AST parser detecting loop nesting depth, logarithmic strides, branching recursion, and raw AST JSON tree inspector.
11. **Custom Input Playground**: Interactive sandbox for sorting custom arrays, executing Stack scripts, building BST sequences, and testing hash collisions.
12. **Real-World Engineering Simulations**:
    * *Hospital Emergency Room*: Priority Queue / Binary Min-Heap prioritizing triage severity.
    * *Music Playlist Player*: Circular Linked List with continuous loop wrap-around.
    * *Browser Navigation*: Dual Stacks (`backStack` & `forwardStack`) for back/forward navigation.
    * *Printer Job Spooler*: FIFO Ordinary Queue scheduling multi-page documents.
    * *City Route Finder*: Weighted Graph + Dijkstra's Algorithm computing shortest routes between city landmarks.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Build** | React 18, Vite 6 |
| **Styling & Theme** | Tailwind CSS (Custom Dark Developer Theme: `#0B1020`, `#111827`, `#151D30`, `#6366F1`, `#06B6D4`, `#22C55E`, `#F59E0B`) |
| **Icons** | Lucide React |
| **Charts** | Recharts (ResponsiveContainer, LineChart, BarChart) |
| **AST Parsing** | Acorn 8.14 (Safe static AST inspection) |
| **Routing** | React Router v6 with SPA Fallback |

---

## 📁 Project Structure

```
LogiX/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json                 # Vercel SPA routing fallback
├── public/
│   └── _redirects              # Netlify SPA routing fallback
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── algorithms/             # Authentic JavaScript algorithms emitting discrete events
│   │   ├── sorting/            # Bubble, Insertion, Selection, Shell, Quick, Radix
│   │   ├── searching/          # Linear & Binary Search
│   │   └── complexity/         # Big-O theoretical curves & empirical benchmark engine
│   ├── java/                   # Textbook-accurate Java 21 LTS reference implementations
│   │   ├── sorting/
│   │   ├── searching/
│   │   ├── stacks/
│   │   ├── queues/
│   │   ├── linkedLists/
│   │   ├── trees/
│   │   ├── heaps/
│   │   ├── graphs/
│   │   ├── hashing/
│   │   └── javaLabCatalog.js   # 22-item Java reference catalog
│   ├── visualizers/            # Reusable SVG & animated visualizer components
│   │   ├── ArrayVisualizer.jsx
│   │   ├── StackVisualizer.jsx
│   │   ├── QueueVisualizer.jsx
│   │   ├── LinkedListVisualizer.jsx
│   │   ├── TreeVisualizer.jsx
│   │   ├── HeapVisualizer.jsx
│   │   ├── GraphVisualizer.jsx
│   │   └── HashTableVisualizer.jsx
│   ├── pages/                  # 13 dedicated application pages
│   │   ├── Dashboard.jsx
│   │   ├── SortingSearching.jsx
│   │   ├── StackQueue.jsx
│   │   ├── LinkedLists.jsx
│   │   ├── TreesHeaps.jsx
│   │   ├── Graphs.jsx
│   │   ├── Hashing.jsx
│   │   ├── AlgorithmRace.jsx
│   │   ├── ComplexityAnalyzer.jsx
│   │   ├── CodeAnalyzer.jsx
│   │   ├── JavaLab.jsx
│   │   ├── Playground.jsx
│   │   └── Simulations.jsx
│   ├── analysis/javascript/    # Acorn AST static complexity analyzer & classification rules
│   ├── components/             # Reusable UI components (Button, Card, CodeEditor, ComplexityBadge)
│   ├── constants/              # Syllabus catalog & simulation metadata
│   └── utils/                  # Tailwind cn class merger
└── test/                       # 7 automated unit test suites
    ├── algorithms.test.js
    ├── dataStructures.test.js
    ├── treesHeapsGraphs.test.js
    ├── raceAndComplexity.test.js
    ├── javaLab.test.js
    ├── codeAnalyzer.test.js
    └── playgroundAndSimulations.test.js
```

---

## 💻 Local Development Setup

### 1. Prerequisites
Ensure **Node.js (v18+)** is installed on your system.

### 2. Start the Development Server
```powershell
npm.cmd run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### 3. Run Automated Unit Tests
To verify algorithm correctness, data structures, and analyzers:
```powershell
node test/algorithms.test.js
node test/dataStructures.test.js
node test/treesHeapsGraphs.test.js
node test/raceAndComplexity.test.js
node test/javaLab.test.js
node test/codeAnalyzer.test.js
node test/playgroundAndSimulations.test.js
```

### 4. Build for Production
```powershell
npm.cmd run build
```
The compiled, optimized, and minified production bundle will be generated in the `dist/` directory.

---

## 🌐 Free Static Deployment (Vercel & Netlify)

Because LogiX is built as a pure static Single-Page Application (SPA) with zero backend dependencies, it can be deployed on free static tiers without configuration:

### Deploying to Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. The included `vercel.json` automatically configures SPA client-side route rewrites.
4. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set Build Command: `npm run build` and Publish Directory: `dist`.
3. The included `public/_redirects` file automatically handles SPA route fallbacks.
4. Click **Deploy Site**.

---

## 📜 License
Developed for Computer Science education. Open source under the MIT License.
