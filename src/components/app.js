import React from "react";
import "../styles/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routers";
import Footer from "./footer";
import MenuBar from "./navigation/menubar";

const App = () => {

    return (
        <div>
            <Router>
                <MenuBar />
                <BaseRouter />
                <Footer />
            </Router>
        </div>
    );
};

export default App;
