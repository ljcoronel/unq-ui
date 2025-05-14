import React from "react";
import "./Input.css";

export default function Input({
  label,
  placeholder = "",
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
  const randomString = Math.random().toString(36).substring(2, 15);
  const randomId = `input-${randomString}`;
  const inputId = id || name || randomId;

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
