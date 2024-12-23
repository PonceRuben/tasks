'use client'
import { TaskProvider } from "../context/TaskContext";
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Page() {
    return(
        <>
            <TaskProvider>
                <TaskForm/>
                <TaskList/>
            </TaskProvider>
        </>
    );
}
    
