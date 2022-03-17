import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layouts/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="add-event" element={<h1>Add event</h1>} />
      </Routes>
    </div>
  );
}

export default App;
