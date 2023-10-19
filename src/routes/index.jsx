import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Register from "../pages/Register";
import Home from "../pages/home";
import Private from "./Private";

function RoutesApp() {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Private> <Admin /> </Private>} />
        </Routes>

    );
}

export default RoutesApp;