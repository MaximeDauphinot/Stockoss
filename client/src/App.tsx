import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AddEvent } from "./components/layouts/add-event";
import { Event } from "./components/layouts/event";
import { Header } from "./components/layouts/header";
import { Home } from "./components/layouts/home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add-event" element={<AddEvent />} />
        <Route path="event/:id" element={<Event />} />
      </Routes>
    </div>
  );
}

export default App;
