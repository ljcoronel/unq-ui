import React from "react";
import "./Button.css";
import { classNames } from "../../../utils/classNames";

export default function Button({ variant = "primary", children, ...props }) {
  const VARIANT_CLASS_MAP = {
    primary: "button-primary",
    secondary: "button-secondary",
  };

  return (
    <button
      {...props}
      className={classNames("button", VARIANT_CLASS_MAP[variant], props.className)}
    >
      {children}
    </button>
  );
}
