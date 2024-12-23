'use client'

import {useState, useEffect} from 'react'
import { useTasks } from '../context/TaskContext'

type User = {
    id: number;
    name: string;
};

export default function TaskForm() {
    
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [idUser, setIdUser] = useState<number | undefined>(undefined);
    const [users, setUsers] = useState<User[]>([]);



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

        try {
            const response = await fetch('api/tasks', {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ title, dueDate, idUser }),
            });

        if (response.ok) {
            const createdTask = await response.json();
            const userName = users.find((user) => user.id === idUser)?.name;
            addTask({ ...createdTask, userName });
            setTitle('');
            setDueDate('');
            setIdUser(undefined);
        } else {
            console.error("Error al crear la tarea", await response.text());
        }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    }

    return (

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
)
}