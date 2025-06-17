import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    title: {type: String, require: true },
    desc: {type: String, require: true }
},
     {timestamps: true, versionKey: false}
);


const Task = mongoose.model('task', TaskSchema);

export default Task;