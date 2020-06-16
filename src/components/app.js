import React from "react";
import TasksBox from "./tasksbox";
import "../styles/main.css";
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = React.useState([]);
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
    return (
        <div>
            <TasksBox tasksarray={tasks} />
        </div>
    );
};

export default App;
