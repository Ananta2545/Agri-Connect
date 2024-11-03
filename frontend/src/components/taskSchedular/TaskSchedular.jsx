import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './TaskSchedular.scss';
import newRequest from '../../utils/newRequest';

const TaskSchedular = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // New state for success/failure
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        const fetchTasks = async()=>{
            try{
                const localDate = date.toISOString().split('T')[0];
                const res = await newRequest.get(`/tasks?date=${localDate}`);
                setTasks(res.data);
            }catch(err){
                console.error("Failed to fetch tasks", err);
            }
        }
        fetchTasks();
    }, [date])


    const scheduleTask = async () => {
        try {
            // Create a new date object without timezone issues
            const localDate = new Date(date);
            localDate.setHours(0, 0, 0, 0); // Set time to midnight
    
            // Get the date as a string in the format YYYY-MM-DD
            const dateString = localDate.toISOString().split('T')[0];

            const res = await newRequest.post('/tasks', {
                title,
                description,
                date: dateString, // Use the formatted date string
            });
    
            setNotification("Task Scheduled Successfully");
            setIsSuccess(true); // Set as success
            setTitle(''); // Clear title after scheduling
            setDescription(''); // Clear description after scheduling
            setTimeout(() => {
                setNotification('');
            }, 3000);
            console.log("Task Response : ", res.data);
    
        } catch (err) {
            console.error("Failed to schedule task", err);
            setNotification("Failed to schedule task");
            setIsSuccess(false); // Set as failure
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }
    };
    
    
    

    return (
        <div className='task-scheduler-container'>
            <h1 className='title'>Schedule your task</h1>
            <Calender onChange={setDate} value={date} />
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
                <h2>Tasks for {date.toISOString().split('T')[0]}:</h2>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index} className='task-item'>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
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
