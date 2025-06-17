import Task from '../model/db_model.js';

// create
export const createTask = async (req, res, next) => {
    try {
        const {title, desc} = req.body;
        await Task.create({title, desc});
        return res.status(201).json({ message: "Task created Successfully!"});
    } catch (error) {
        next(error);
    }
}

// read
export const readTask = async (req, res) => {
    try {
        const data = await Task.find();
        return res.json({status: "Success", data: data});
    } catch (error) {
        
    }
}