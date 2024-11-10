import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './TaskSchedular.scss';
import newRequest from '../../utils/newRequest';

const TaskSchedular = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [tasks, setTasks] = useState([]);
    

    // Helper function to format the date as 'YYYY-MM-DD'
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const formattedDate = formatDate(date); // Format the date
                const res = await newRequest.get(`/api/tasks?date=${formattedDate}`);
                setTasks(res.data);
            } catch (err) {
                console.error("Failed to fetch tasks", err);
            }
        };
        fetchTasks();
    }, [date]);

    const updateTaskStatus = async(taskId)=>{
        try{
            const res = await newRequest.put(`/api/task/${taskId}`,{
                isCompleted: true,
            });

            console.log("Task Updated : ", res.data);
            // Update task list to reflect the completed status
            const updatedTasks = tasks.map((task) =>
                task._id === taskId ? { ...task, isCompleted: true } : task
            );
            setTasks(updatedTasks);
            setNotification("Task marked as completed");
            setIsSuccess(true);
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }catch(err){
            console.error("Failed to update task status", err);
            setNotification("Failed to mark task as completed");
            setIsSuccess(false);
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }
    }

    const scheduleTask = async () => {
        try {
            const formattedDate = formatDate(date); // Format the date

            const res = await newRequest.post('/api/tasks', {
                title,
                description,
                date: formattedDate, // Use the formatted date
            });

            setNotification("Task Scheduled Successfully");
            setIsSuccess(true);
            setTitle('');
            setDescription('');
            setTimeout(() => {
                setNotification('');
            }, 3000);
            console.log("Task Response: ", res.data);

            // Refetch tasks after scheduling
            const updatedTasks = await newRequest.get(`/api/tasks?date=${formattedDate}`);
            setTasks(updatedTasks.data);

        } catch (err) {
            console.error("Failed to schedule task", err);
            setNotification("Failed to schedule task");
            setIsSuccess(false);
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }
    };

    return (
        <div className='task-scheduler-container'>
            <h1 className='title'>Schedule your task</h1>
            <Calendar onChange={setDate} value={date} />
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Task Title'
                className='input-field'
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder='Task description' 
                className='textarea-field'
            ></textarea>
            <button onClick={scheduleTask} className='schedule-button'>Schedule Task</button>

            {notification && (
                <div className={`notification ${isSuccess ? 'success' : 'fail'}`}>
                    {notification}
                </div>
            )}

            <div className="task-list-container">
                <h2>Tasks for {formatDate(date)}:</h2>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index} className='task-item'>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <button 
                                onClick={() => updateTaskStatus(task._id)}
                                className='complete-button'
                                disabled={task.isCompleted}
                            >
                                {task.isCompleted ? "Completed" : "Mark as Completed"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tasks scheduled for this date.</p>
                )}
            </div>
        </div>
    );
};

export default TaskSchedular;
