// import axios from 'axios';
import Task from '../models/task.model.js';
// import dotenv from 'dotenv';

export const createTask = async(req, res)=>{
    try{
        const {title, description, date, isCompleted} = req.body;
        const userId = req.userId;
        console.log("Received Date: ", date);

        const task = new Task({title,description,date, isCompleted, user: userId})
        await task.save();
        res.status(201).json(task);
    }catch(err){
        res.status(500).json({message: "Failed to create Task",err});
    }
}

export const getTasks = async(req, res)=>{
    try{
        const userId = req.userId;
        const {date} = req.query;
        console.log(date);
        
        const query = date? {date, user: userId} : {user: userId};// if date is provided filter tasks by date
        const tasks = await Task.find(query);// fetch task with the query
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message : "Failed to get tasks"});
    }
}

export const getTask = async(req, res)=>{
    try{
        const {id} = req.params;
        const userId = req.userId;
        const task = await Task.findOne({_id: id, user: userId});
        if(task){
            res.status(201).json(task);
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(err){
        res.status(500).json({message: "Failed to fetch the task"});
    }
}

export const getTaskByDate = async(req, res)=>{
    try{
        const userId = req.userId;
        const {date} = req.params;
        const tasks = await Task.find({date : new Date(date), user: userId});
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message: "Failed to get task by date"}, err);
    }
}


export const getMonthlyTaskStats = async (req, res) => {
    try {
        const { year, month } = req.query;
        const userId = req.userId;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const tasks = await Task.find({ date: { $gte: startDate, $lte: endDate }, user: userId });
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.isCompleted).length;
        const remainingTasks = totalTasks - completedTasks;

        res.status(200).json({ totalTasks, completedTasks, remainingTasks });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get task statistics', error });
    }
};

export const updateTask = async(req, res)=>{
    try{
        const {id} = req.params;
        const userId = req.userId;
        const {title, description, date, isCompleted} = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: userId }, // Ensure the task belongs to the user
            { title, description, date, isCompleted },
            { new: true }
        );
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }catch(err){
        res.status(500).json({message: "Failed to update the task", err});
    }
}

export const deleteTask = async(req, res)=>{
    try{
        const userId = req.userId;
        const {id} = req.params;
        await Task.findOneAndDelete({_id: id, user: userId});
        res.status(500).json({message : "Deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Failed to delete the task"});
    }
}
