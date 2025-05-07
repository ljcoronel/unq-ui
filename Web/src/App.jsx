import React from "react";
import Button from "./components/atoms/button/Button";
import Input from "./components/atoms/input/Input";
import { formatCurrency } from "./utils/money";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import "./App.css";

export default function App() {
  return (
    <div className="contenedor">
      <Button onClick={() => alert("Button clicked!")} variant="primary">
        Add friend
      </Button>
      <Button onClick={() => alert("Button clicked!")} variant="secondary">
        Add friend
      </Button>

      <Input
        label="Name"
        placeholder="Enter your name"
        type="text"
        name="name"
        id="name"
        value=""
        onChange={() => {}}
        disabled={true}
        error=""
      />

      <p>{formatCurrency(12456.55, 2)}</p>
      <ThumbsUp />
      <ThumbsDown />

      <img
        src="/gog.png"
        alt="Example"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}
