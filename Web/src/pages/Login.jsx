import React, { useState } from "react";
import "../styles/Login.css";
import Button from "../components/atoms/button/Button";
import Input from "../components/atoms/input/Input";
import toast from "react-hot-toast";
import { api } from "../config/axios.config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.headers["authorization"]; // o el nombre correcto
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful!");
      } else {
        toast.error("No token received.");
      }

      console.log("Login response:", res);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign in</h2>
        <Input
          label="SIGN IN WITH EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button>Sign in</Button>
      </form>
    </div>
  );
}
