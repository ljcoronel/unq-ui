import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { getToken } from "./config/axios.config";

export default function App() {
  console.log("reload")

  const [isLoggedIn , setIsLoggedIn] =  useState(!!getToken());

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} logout={() => setIsLoggedIn(false)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register setIsLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}
