'use client';


import { useTasks } from "../context/TaskContext";

export default function TaskList() {
    const { tasks, deleteTask } = useTasks();
    
    const handleDelete = async (taskId: number) => {
        const { tasks, deleteTask } = useTasks();    
        
        try {
            const response = await fetch('/api/tasks/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskId}),
            });
        
            if (response.ok) {
                deleteTask(taskId);
            } else {
                console.error('Error al eliminar la tarea');
            }
            } catch (error) {
            console.error('Error en la eliminación:', error);
            }
        };
        
    return (
    
        <div className="mx-auto w-2/4 mt-10 bg-gray-100 p-5 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Lista de tareas</h2>
                {tasks.length === 0 ? (
                <p className="text-gray-500">No hay tareas creadas.</p>
                ) : (
                <ul>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="border-b border-gray-300 py-2 flex justify-between"
                    >
                        <div>
                            <p className="font-bold">{task.title}</p>
                            <p className="text-sm text-gray-600">
                                Asignado a: {task.userName}
                            </p>
                            <p className="text-sm text-gray-600">
                                Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(task.id)}> Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        )}
        </div>
)
}
