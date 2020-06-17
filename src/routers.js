import React from "react";
import { Route } from "react-router-dom";
import TasksBox from "./components/taskbox/tasksbox";
import About from "./components/staticpages/about";

const BaseRouter = () => {
    return (
        <div>
            <Route exact path="/" component={TasksBox} />
            <Route exact path="/about" component={About} />
        </div>
    )
}

export default BaseRouter;

