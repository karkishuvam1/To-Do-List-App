const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id})
            .populate('category', 'name color')
            .sort({createdAt: -1}) //it will sort the tasks in descending order based on the createdAt field

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('category', 'name color');
        
        if(!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        
        if(task.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'});
        }

        res.status(200).json(task);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const createTask = async (req, res) =>{
    const {title, description, priority, dueDate, time, category} = req.body;

    try {
        if(!title){
            return res.status(400).json({message: 'Task Title is required'})
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            time,
            category : category || null,
            user: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    try{
        if(!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        if (task.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'});
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} //this option returns the updated document instead of the original one
        ).populate('category', 'name color'); //populate the category field with name and color

        res.status(200).json(updatedTask);

    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteTask = async (req, res) => {
    try{
        const task  = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        if(task.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: 'Not authorized'})
        }

        await task.deleteOne();

        res.status(200).json({message:'Task deleted successfully'})
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask}