import React from "react";
import Task from './task';
import { useState } from "react";
import axios from "axios";

const TasksBox = () => {

    const [newtasks, setnewtasks] = useState([]);
    const [taskvalue, settaskvalue] = useState("");
    
    function changehandler(event) {
        settaskvalue(event.target.value);
    }

    function addtasks(event) {
        if(event.key === "Enter" || event.button === 0) {
            var newtask = document.getElementById('tasker').value;
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
    }

    const [tasks, setTasks] = useState([]);

    React.useEffect(() => {
        axios
            .get("https://djangoapitodo.herokuapp.com/tasks/api/")
            .then((res) => {
                var t = [];
                for (var obj in res.data) {
                    t.push({
                        key: res.data[obj]["id"],
                        id: res.data[obj]["id"],
                        task: res.data[obj]["task"],
                        isdone: res.data[obj]["is_done"],
                    });
                }
                setTasks(t);
            });
    }, []);

    document.addEventListener('keypress', addtasks);

    return (
        <div>
            <div className="mt-5 pt-5 pb-5 text-center mr-auto ml-auto taskbox">
                <h2>To do List</h2>
                <div className="mb-5 mt-5">
                    {tasks.map((task) => {
                       return <Task task={task.task} key={task.id} id={task.id} isdone={task.isdone} />
                   })}
                   {newtasks.map((task) => {
                       return <Task task={task.task} key={task.id} id={task.id} isdone={task.isdone} />
                   })}
                </div>
                <div className="inliner task-container">
                    <input type="text" className="task-input mr-auto ml-auto" id="tasker" value={taskvalue} onChange={changehandler} placeholder="New Task..(max 50 chars)"/>
                    <div className="inliner">
                        <p onClick={addtasks} className="hooki">✔</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default TasksBox;