'use client'
import { useState, useEffect } from "react"

type Task = {
    id: number;
    title: string;
    dueDate: string;
    userId: number;
    userName?: string;
};

export default function Form() {
    
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [idUser, setIdUser] = useState<number | undefined>(undefined);
    const [users, setUsers] = useState<any[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);


    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => {
                console.log("Usuarios recibidos:", data);
                setUsers(data);
            })
            
            .catch((error) => console.error('Error al obtener usuarios:',error))
    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos a enviar:", { title, dueDate, idUser });
        const newTask = ({title, dueDate, idUser})

        try {
            const response = await fetch('api/tasks', {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newTask),
            });

        if (response.ok) {
            const createdTask = await response.json();
            const userName = users.find((user) => user.id === idUser)?.name;
            setTasks([...tasks, { ...createdTask, userName }]);
            setTitle('');
            setDueDate('');
            setIdUser(Number(''));
        } else {
            console.error("Error al crear la tarea", await response.text());
        }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    }

    const handleDelete = async (taskId: number) => {
        try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            setTasks(tasks.filter((task) => task.id !== taskId));
        } else {
            console.error('Error al eliminar la tarea');
        }
        } catch (error) {
        console.error('Error en la eliminación:', error);
        }
    };
    
    return (
        <>
            <div className="flex flex-col justify-center mx-auto w-2/4 my-10 bg-gray-50 text-black rounded shadow">
                <h1 className="mt-8 text-3xl">Crear nueva tarea</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-7 mt-8 ">
                    <input 
                        className="border border-black"
                        type="text" 
                        placeholder="Titulo" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}>
                    </input>
                    <input 
                        className="border border-black"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}>
                    </input>
                    <select
                        className="border border-black"
                        value={idUser}
                        onChange={(e) => setIdUser(Number(e.target.value))}>
                        <option value="">Seleccionar Usuario</option>
                        {users.map((user) =>(
                        <option key={`user-${user.id}`} value={user.id}>{user.name}</option>  
                        ))}
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded"type="submit">Crear task</button>
                </form>
            </div>
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
        </>
    )
}