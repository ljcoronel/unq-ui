import { useState } from "react";
import "../styles/Login.css";
import Button from "../components/atoms/button/Button";
import Input from "../components/atoms/input/Input";
import toast from "react-hot-toast";
import { api, setToken } from "../config/axios.config";
import { useNavigate } from "react-router";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.headers["authorization"];
      if (token) {
        setToken(token);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("No token received.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <section className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign in</h2>
        <Input
          label="SIGN IN WITH EMAIL"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="PASSWORD"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button>Sign in</Button>
      </form>
    </section>
  );
}
