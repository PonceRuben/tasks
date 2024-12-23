'use client'   

import React, {createContext, useContext, useState, ReactNode} from 'react';

type Task = {
    id: number;
    title: string;
    dueDate: string;
    userId: number;
    userName? : string;
};

type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
}


const TaskContext = createContext<TaskContextType | undefined>(undefined);


export const TaskProvider = ({children} : {children: ReactNode}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => setTasks((prev) => [...prev,task]);

    const deleteTask = (taskId: number) => 
        setTasks((prev) => prev.filter((task) => task.id !== taskId));


    return (
        <TaskContext.Provider value={{tasks, addTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    );
};


export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks debe usarse dentro de TaskProvider');
    }

    return context;
}