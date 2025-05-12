import React from "react";
import "./Input.css";

export default function Input({
  label,
  placeholder = "Enter text here",
  type = "text",
  name,
  id,
  value = "",
  onChange = () => {},
  disabled = false,
  error = "",
  className = "",
  required = false,
  ...props
}) {
  const inputId = id || name || "input";
  
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
        {...props}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}
