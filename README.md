# 🧭 Path Finder Viz

![Path Finder Viz Screenshot](./Screenshot%202025-07-07%20005346.png)

## 🚀 Overview

**Path Finder Viz** is an interactive web application designed to visualize and compare different pathfinding algorithms on a grid. It's a powerful tool for students, educators, and developers to better understand how each algorithm works in real-time.

---

## 🧰 Features

- 🔹 **Start & Target Points**  
  Easily set the starting and destination positions on the grid.

- 🔹 **Bricks (Walls)**  
  Add impassable blocks to simulate obstacles in the grid.

- 🔹 **Weights**  
  Apply different weights to cells to simulate variable traversal costs (useful for Dijkstra’s & A*).

- 🔹 **Algorithms Supported**
  - **BFS (Breadth-First Search)**
  - **BDS (Bidirectional Search)**
  - **Dijkstra’s Algorithm**
  - **A* Search Algorithm**

- 🔹 **Erase Tool**  
  Erase bricks, weights, or positions when needed.

- 🔹 **Reset Grid**  
  Reset the grid to its initial empty state with one click.

- 🔹 **Run Multiple Algorithms**  
  Simultaneously run more than one algorithm for performance comparison.

- 🔹 **Export Grid**  
  Export your grid setup as `.png`, `.jpeg`, or `.pdf`.

- 🔹 **Print Metrics**  
  View side-by-side comparisons of all algorithms:
  - Number of steps
  - Execution time
  - Path cost (if applicable)

- 🔹 **User Guide**  
  Built-in interactive help that explains how to use each feature.

---

## 📸 Screenshot

![Screenshot](./Screenshot%202025-07-07%20012059.png)
---

## 🛠️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivamgoyal5/Path-Visualizer.git
   cd Path-Visualizer
   npm install
   npm run dev
2. Check it live at
   https://path-visualizer-two.vercel.app/
