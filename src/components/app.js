import React from "react";
import TasksBox from "./tasksbox";
import '../styles/main.css';
import axios from 'axios';


class App extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        axios.get("http://djangoapitodo.herokuapp.com/tasks/api/")
        .then(res => {
            var t = [];
            for(var obj in res.data) {
                t.push({
                    "key": res.data[obj]['id'],
                    "id": res.data[obj]['id'],
                    "task": res.data[obj]['task'],
                    "isdone":res.data[obj]['is_done'],
                })
            }
            this.setState({
                tasks: t
            });
        })
    }
    render() {
        return (
            <div>
                <TasksBox tasksarray={this.state.tasks}/>
            </div>   
        )
    }
}

export default App;