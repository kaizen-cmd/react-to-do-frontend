import React from "react";
import Task from './task';
import { useState } from "react";
import axios from "axios";

const TasksBox = (props) => {

    const [newtasks, setnewtasks] = useState([]);
    const [taskvalue, settaskvalue] = useState("");
    
    function changehandler(event) {
        settaskvalue(event.target.value);
    }

    function addtasks() {
        var newtask = taskvalue;
        if(newtask !== "") {
            axios.post('https://djangoapitodo.herokuapp.com/tasks/api/', {'task': newtask,}, {headers: {'content-type': 'application/json'}}).then(res => {
                setnewtasks((prev) => {
                    return [...prev, {
                        'key': res.data['id'],
                        'id': res.data['id'],
                        'task': res.data['task'],
                        'isdone': res.data['is_done'],
                    }]
                });
            });
        }
        settaskvalue("");
    }

    return (
        <div>
            <div className="mt-5 pt-5 pb-5 text-center mr-auto ml-auto taskbox">
                <h2>To do List</h2>
                <p>Click on the task to edit</p>
                <div className="mb-5 mt-5">
                    {props.tasksarray.map((task) => {
                       return <Task task={task.task} key={task.id} id={task.id} isdone={task.isdone} />
                   })}
                   {newtasks.map((task) => {
                       return <Task task={task.task} key={task.id} id={task.id} isdone={task.isdone} />
                   })}
                </div>
                <div className="inliner">
                    <input type="text" className="form-control mr-auto ml-auto" id="tasker" value={taskvalue} onChange={changehandler} placeholder="New Task.."/>
                </div>
                <div className="inliner">
                    <p onClick={addtasks} className="hooki">Add</p>
                </div> 
            </div>
        </div>
    )
}

export default TasksBox;