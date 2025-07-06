// import { useContext, useState, createContext, useEffect, useRef } from "react";
// import { getGrid } from "../utils/startingGrid";
// import { BFS, BDS, Dijkstra, AStar } from "../utils/algorithms";

// const Context = createContext();

// export const useParams = () => {
//     return useContext(Context);
// };

// export const ParamsProvider = ({ children }) => {
//     const [mode, setmode] = useState(null); // Current editing mode
//     const [algo, setalgo] = useState([]);  // Selected algorithm
//     const [run, setrun] = useState(false); // Flag to start algorithm
//     const [grid, setgrid] = useState(getGrid(57, 25)); // Grid state
//     const [editing, seteditFlag] = useState(false); // Editing state
//     const [res, setres] = useState(false); // Reset flag
//     const start = useRef({ x: 28, y: 12 }); // Start node
//     const end = useRef({ x: 55, y: 23 }); // Target node
//     const [weightedCells, setWeightedCells] = useState({});
//     const [warning, setWarning] = useState("");


//     useEffect(() => {
//         if (res) {
//             restart();
//             setres(false);
//         }
//     }, [res]);

//     const toggleAddWeightMode = () => {
//         setmode(mode === "addWeight" ? null : "addWeight");
//     };

//     const clearBoard = () => {
//         const newGrid = getGrid(57, 25); // Generate a fresh grid
//         setgrid(newGrid); // Reset the grid to the default state
//         start.current = { x: 28, y: 12 }; // Reset start node to default
//         end.current = { x: 55, y: 23 }; // Reset end node to default
//         setmode(null); // Clear editing mode
//         setalgo(""); // Reset algorithm selection
//         setrun(false); // Ensure no algorithm is running
//         seteditFlag(false); // Reset editing flag

//         const allCells = document.querySelectorAll(".cell");
//         allCells.forEach((cell) => {
//              cell.classList.remove("traversal", "path");
//              cell.style.backgroundColor = '';
//         });
//     };
    
    

//     const restart = () => {
//         console.log("Restarting grid...");
//         setgrid(getGrid(60, 25)); // Reset the grid
//     };

//     // Handle cell clicks (add weight if in "addWeight" mode)
//     const handleCellClick = (y, x) => {
//         if (mode === "addWeight") { // Only add weight if in "addWeight" mode
//             const cellKey = `${y}-${x}`; // Unique key for each cell
//             const newWeight = Infinity; // Assign weight (you can change this value)
            
//             // Ensure we're not editing the start or end nodes
//             if (!grid[y][x].isstart && !grid[y][x].istarget) {
//                 const newGrid = [...grid]; // Create a copy of the grid
//                 newGrid[y][x] = { ...newGrid[y][x], weight: newWeight }; // Update the cell's weight
//                 setgrid(newGrid); // Update the grid state with the new weight
//                 setWeightedCells((prev) => ({ ...prev, [cellKey]: newWeight })); // Track weighted cells
//             }
//         }
//     };

//     useEffect(() => {
//         if (run) {
//             console.log("Running algorithm:", algo);
//             console.log("Start:", start.current, "End:", end.current);

//             if (
//                 !start.current ||
//                 !end.current ||
//                 start.current.x === undefined ||
//                 start.current.y === undefined ||
//                 end.current.x === undefined ||
//                 end.current.y === undefined
//             ) {
//                 console.error("Invalid start or end node.");
//                 setrun(false);
//                 return;
//             }

//             const gridCopy = grid.map(row => row.map(cell => ({ ...cell }))); // Create a copy of the grid


            
//             let hashmap = {};
//             let prevmap = {};
            

//             let result;
//             if (algo === "BFS") {
//                 result = BFS(gridCopy, hashmap, prevmap, start.current, end.current);
//             } else if (algo === "BDS") {
//                 result = BDS(gridCopy, hashmap, prevmap, start.current, end.current);
//             } else if (algo === "djikstra") {
//                 result = Dijkstra(gridCopy, hashmap, prevmap, start.current, end.current);
//             } 
//             else if (algo === "Astar") {
//                 result = AStar(gridCopy, hashmap, prevmap, start.current, end.current);
//             }

//             if (result && result.path) {
//                 console.log("Algorithm found a path:", result.path);

//                 // Visualize the path
//                 result.path.forEach((node, index) => {
//                     setTimeout(() => {
//                         const { x, y } = node;
//                         gridCopy[y][x].isPath = true; // Update cell as part of the path
//                         setgrid([...gridCopy]); // Trigger re-render
//                     }, index * 50); // Delay for visualization
//                 });
//             } else {
//                 console.error("No path found.");
//                 // setWarning("No path found!");
//                 // setTimeout(() => setWarning(""), 5000); 
//             }

//             setrun(false);
//         }
//     }, [run, algo, grid]);

//     return (
//         <Context.Provider
//             value={{
//                 mode,
//                 setmode,
//                 algo,
//                 setalgo,
//                 grid,
//                 setgrid,
//                 setres,
//                 editing,
//                 seteditFlag,
//                 start,
//                 end,
//                 run,
//                 setrun,
//                 res,
//                 clearBoard,
//                 weightedCells,
//                 setWeightedCells,
//                 handleCellClick,
//                 toggleAddWeightMode,
//                 warning,
//             }}
//         >
//             {children}
//             {warning && (
//                 <div
//                     style={{
//                         position: "fixed",
//                         bottom: "20px",
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         backgroundColor: "red",
//                         color: "white",
//                         padding: "10px 20px",
//                         borderRadius: "5px",
//                         zIndex: 1000,
//                     }}
//                 >
//                     {warning}
//                 </div>
//             )}
//         </Context.Provider>
//     );
// };


import { useContext, useState, createContext, useEffect, useRef } from "react";
import { getGrid } from "../utils/startingGrid";
import { BFS, BDS, Dijkstra, AStar } from "../utils/algorithms";

const Context = createContext();

export const useParams = () => {
    return useContext(Context);
};

export const ParamsProvider = ({ children }) => {
    const [mode, setmode] = useState(null);
    const [algo, setalgo] = useState([]);
    const [run, setrun] = useState(false);
    const [grid, setgrid] = useState(getGrid(50, 25));
    const [editing, seteditFlag] = useState(false);
    const [res, setres] = useState(false);
    const start = useRef({ x: 26, y: 12 });
    const end = useRef({ x: 48, y: 23 });
    const [weightedCells, setWeightedCells] = useState({});
    const [warning, setWarning] = useState("");

    useEffect(() => {
        if (res) {
            restart();
            setres(false);
        }
    }, [res]);

    const toggleAddWeightMode = () => {
        setmode(mode === "addWeight" ? null : "addWeight");
    };

    const clearBoard = () => {
        const newGrid = getGrid(50, 25);
        setgrid(newGrid);
        start.current = { x: 26, y: 12 };
        end.current = { x: 48, y: 23 };
        setmode(null);
        setalgo([]); // Changed to empty array
        setrun(false);
        seteditFlag(false);
        setWeightedCells({});

        const allCells = document.querySelectorAll(".cell");
        allCells.forEach((cell) => {
            cell.classList.remove("traversal", "path");
            cell.style.backgroundColor = '';
        });
    };

    const restart = () => {
        console.log("Restarting grid...");
        setgrid(getGrid(50, 25)); // Consistent size
    };

    // Updated handleCellClick with erase functionality
    const handleCellClick = (y, x) => {
        if (editing) {
            const newGrid = [...grid];
            
            // Erase mode - remove walls and weights
            if (mode === "erase") {
                newGrid[y][x] = { 
                    ...newGrid[y][x], 
                    iswall: false,
                    weight: 1,
                    isPath: false
                };
                const cellKey = `${y}-${x}`;
                setWeightedCells(prev => {
                    const newWeights = {...prev};
                    delete newWeights[cellKey];
                    return newWeights;
                });
            }
            // Add weight mode
            else if (mode === "addWeight") {
                const cellKey = `${y}-${x}`;
                const newWeight = Infinity;
                
                if (!newGrid[y][x].isstart && !newGrid[y][x].istarget) {
                    newGrid[y][x] = { ...newGrid[y][x], weight: newWeight };
                    setWeightedCells(prev => ({ ...prev, [cellKey]: newWeight }));
                }
            }
            // Other modes (start, target, walls) remain the same
            else if (mode === "setstart") {
                newGrid.forEach(row => row.forEach(cell => { cell.isstart = false; }));
                newGrid[y][x] = { ...newGrid[y][x], isstart: true, istarget: false, weight: 1, iswall: false };
                start.current = { x, y };
            }
            else if (mode === "settarget") {
                newGrid.forEach(row => row.forEach(cell => { cell.istarget = false; }));
                newGrid[y][x] = { ...newGrid[y][x], isstart: false, istarget: true, weight: 1, iswall: false };
                end.current = { x, y };
            }
            else if (mode === "addbricks") {
                if (!newGrid[y][x].isstart && !newGrid[y][x].istarget) {
                    newGrid[y][x] = { ...newGrid[y][x], iswall: true, weight: 1 };
                }
            }

            setgrid(newGrid);
        }
    };

    // Mouse event handlers
    const handleMouseDown = () => seteditFlag(true);
    const handleMouseUp = () => seteditFlag(false);

    useEffect(() => {
        if (run && algo.length > 0) {
            console.log("Running algorithms:", algo);
            
            if (!start.current || !end.current) {
                console.error("Invalid start or end node.");
                setrun(false);
                return;
            }

            const gridCopy = grid.map(row => row.map(cell => ({ ...cell })));
            let results = [];

            algo.forEach(algorithm => {
                let hashmap = {};
                let prevmap = {};
                
                // Initialize hashmap and prevmap
                for (let y = 0; y < gridCopy.length; y++) {
                    for (let x = 0; x < gridCopy[0].length; x++) {
                        hashmap[`${x}-${y}`] = false;
                        prevmap[`${x}-${y}`] = null;
                    }
                }

                let result;
                switch(algorithm) {
                    case 'BFS':
                        result = BFS(gridCopy, hashmap, prevmap, start.current, end.current);
                        break;
                    case 'BDS':
                        result = BDS(gridCopy, hashmap, prevmap, start.current, end.current);
                        break;
                    case 'Dijkstra':
                        result = Dijkstra(gridCopy, hashmap, prevmap, start.current, end.current);
                        break;
                    case 'AStar':
                        result = AStar(gridCopy, hashmap, prevmap, start.current, end.current);
                        break;
                    default:
                        console.warn(`Unknown algorithm: ${algorithm}`);
                        return;
                }

                if (result) {
                    results.push(result);
                }
            });

            // Visualize results
            if (results.length > 0) {
                // Clear previous visualizations
                const newGrid = grid.map(row => row.map(cell => ({ ...cell, isPath: false })));
                
                results.forEach((result, algoIndex) => {
                    if (result.path) {
                        result.path.forEach((node, index) => {
                            setTimeout(() => {
                                const { x, y } = node;
                                newGrid[y][x].isPath = true;
                                // Use different colors for different algorithms if needed
                                setgrid([...newGrid]);
                            }, index * 50 + (algoIndex * 1000)); // Stagger animations
                        });
                    }
                });
            } else {
                setWarning("No path found!");
                setTimeout(() => setWarning(""), 3000);
            }

            setrun(false);
        }
    }, [run, algo, grid]);

    return (
        <Context.Provider
            value={{
                mode,
                setmode,
                algo,
                setalgo: (value) => setalgo(Array.isArray(value) ? value : [value]), // Ensure algo is always array
                grid,
                setgrid,
                setres,
                editing,
                seteditFlag,
                start,
                end,
                run,
                setrun,
                res,
                clearBoard,
                weightedCells,
                setWeightedCells,
                handleCellClick,
                toggleAddWeightMode,
                warning,
                handleMouseDown,
                handleMouseUp
            }}
        >
            {children}
            {warning && (
                <div className="warning-banner">
                    {warning}
                </div>
            )}
        </Context.Provider>
    );
};