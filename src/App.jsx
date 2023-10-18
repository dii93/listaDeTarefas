import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import style from "./style.module.css";

function App() {
  return (
    <BrowserRouter className={style.container}>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;