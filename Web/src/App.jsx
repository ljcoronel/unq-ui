import React from "react";
import "./components/atoms/button/Button.css";
import "./components/atoms/input/Input.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Register"; 



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    
  );
}
