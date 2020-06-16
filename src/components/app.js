import React, { useState } from "react";
import TasksBox from "./tasksbox";
import '../styles/main.css';
import axios from 'axios';


const App = () => {

    const [taskarray, settaskarray] = useState([]);

    axios.get("https://djangoapitodo.herokuapp.com/tasks/api/").then((res) => {
        var t = [];
        settaskarray(() => {
           res.data.map((task) => {
               return {
                'key': task['id'],
                'id': task['id'],
                'task': task['task'],
                'isdone': task['is_done'],
               }
           })
        })
    })
    
                        
    return (
        <div>
            <TasksBox tasksarray={taskarray.map((task) => {
                return {
                    'key': task['id'],
                    'id': task['id'],
                    'task': task['task'],
                    'isdone': task['is_done'],
                }
            })}/>
            <footer className="text-center mt-5"><p>Copyright © Tejas Mandre 2020</p></footer>
        </div>
    )
}

export default App;