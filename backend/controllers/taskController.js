// import axios from 'axios';
import Task from '../models/task.model.js';
// import dotenv from 'dotenv';

export const createTask = async(req, res)=>{
    try{
        const {title, description, date} = req.body;
        console.log("Received Date: ", date);

        const task = new Task({title,description,date})
        await task.save();
        res.status(201).json(task);
    }catch(err){
        res.status(500).json({message: "Failed to create Task",err});
    }
}

export const getTasks = async(req, res)=>{
    try{
        const {date} = req.query;
        console.log(date);
        const query = date? {date} : {};// if date is provided filter tasks by date
        const tasks = await Task.find(query);// fetch task with the query
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message : "Failed to get tasks"});
    }
}

export const getTask = async(req, res)=>{
    try{
        const {id} = req.params;
        const task = await Task.findById(id);
        if(task){
            res.status(201).json(task);
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(err){
        res.status(500).json({message: "Failed to fetch the task"});
    }
}

export const deleteTask = async(req, res)=>{
    try{
        const {id} = req.params;
        await Task.findByIdAndDelete(id);
        res.status(500).json({message : "Deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Failed to delete the task"});
    }
}
