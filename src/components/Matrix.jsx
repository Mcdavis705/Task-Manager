import React, { useEffect,useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RotateCcw, Minus, Plus, Save } from 'lucide-react';
import './Test.css';

const ItemType = 'TASK';

const initialItems = [
    { nom: "Go the gym", caixa: "DO" },
    { nom: "What car to buy", caixa: "DECIDE" },
    { nom: "Go for groceries", caixa: "DELEGATE" },
    { nom: "Go out for lunch", caixa: "DELETE" }
];

const CAIXES = ["DO", "DECIDE", "DELEGATE", "DELETE"];

const Task = ({ name }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { type: ItemType, name },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });





    return (
        <div
            ref={drag}
            className={`border p-2 bg-transparent rounded-lg shadow-sm mb-4 transition-opacity duration-150 ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <h2 className="text-lg text-white tracking-tight">{name}</h2>

        </div>
    );
};

const Box = ({ children, title, mouItem }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
            const itemName = item.name;
            const containerTitle = title;
            mouItem(itemName, containerTitle);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={
                `${title === "DO" ? "bg-green-500" : title==="DECIDE" ? "bg-purple-500" : title==="DELEGATE" ? "bg-red-500" : title==="DELETE" ? "bg-gray-500":""} 
                p-8 min-h-[400px] border rounded
                ${isOver ? 'bg-blue-500' : ''}`
            }x
        >
            <h1 className="text-3xl text-white font-bold text-center mb-4 tracking-tight">{title}</h1>
            {children}
        </div>
    );
};

const Matrix = () => {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');

    const handleAddTask = () => {
        if (newTaskName.trim() !== '') {
            const novaTasca = {
                nom: newTaskName.trim(),
                caixa: "DO",
            };
            setItems([...items, novaTasca]);
            setNewTaskName('');
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const mouItem = (itemName, caixa) => {
        const nousItems = items.map(it =>
            it.nom === itemName ? { ...it, caixa } : it
        );
        setItems(nousItems);
    };

    const deleteTasksInDeleteBox = () => {
        const nousItems = items.filter(it => it.caixa !== "DELETE");
        setItems(nousItems);
    };

    // Save to local storage
    const handleSave = () => {
        localStorage.setItem('items', JSON.stringify(items));
    };

    // Load/load tasks from local storage
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);



    return (
        <DndProvider backend={HTML5Backend}>
            <h1 className="text-4xl text-center font-bold text-gray-800 mb-4">
                Eisenhower's Decision Matrix
            </h1>

            <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 p-2 m-2 bg-none border border-blue-500 hover:bg-blue-700 hover:text-white text-sm font-medium rounded-xl shadow-md transition-colors duration-200"
            >
                <Plus className="w-4 h-4" />
                Add Task
            </button>

            <div className="grid grid-cols-2 gap-6">
                {CAIXES.map(caixa => (
                    <Box key={caixa} title={caixa} mouItem={mouItem}>
                        {items
                            .filter(e => e.caixa === caixa)
                            .map(e => <Task key={e.nom} name={e.nom} />)}
                    </Box>
                ))}
            </div>


            <div className="flex justify-space-between ">
                {/* add buttons to save to the local storage */}
                <button
                    className="flex items-center gap-2 p-2 m-2 bg-none border border-blue-500 hover:bg-blue-700 hover:text-white text-sm font-medium rounded-xl shadow-md transition-colors duration-200"
                    onClick={handleSave}
                >
                    <Save className="w-4 h-4" />
                    Save
                </button>

                {/* Load tasks from local storage in case of am page refresh */}
                <button
                    className="flex items-center gap-2 p-2 m-2 bg-transparent text-green-600 border border-green-500 hover:bg-green-600 hover:text-white text-sm font-medium rounded-xl shadow-md transition-colors duration-200"
                >
                    <RotateCcw className="w-4 h-4" />
                    Recover tasks
                </button>


                {/* Button to delete tasks in the "DELETE" box */}
                <button
                    onClick={deleteTasksInDeleteBox}
                    className="flex items-center gap-2 p-2 m-2 bg-red-500 border border-white-500 hover:bg-red-800 text-white text-sm font-medium rounded-xl shadow-md transition-colors duration-200"
                >
                    <Minus className="w-4 h-4" />
                    Clear tasks
                </button>


            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Task name"
                            className="w-full border rounded p-2 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTask}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DndProvider>
    );
};

export default Matrix;
