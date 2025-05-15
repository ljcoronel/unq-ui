import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { getToken } from "./config/axios.config";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
}
