import React from "react";
import "./Layout.css";
import { Search } from "lucide-react";
import { classNames } from "../../utils/classNames";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const pathname = window.location.pathname;
  const NAVIGATION_ITEMS = [
    { name: "STORE", path: "/" },
    { name: "LIBRARY", path: "/library" },
  ];

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-left">
          <img src="/gog.png" alt="GOG Logo" className="layout-logo" />
        </div>
        <nav className="layout-nav">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              to={item.path}
              className={classNames(
                "layout-link",
                pathname === item.path ? "active" : ""
              )}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}

          <div className="layout-search">
            <Search className="search-icon" />
            <input type="text" placeholder="SEARCH" />
          </div>
        </nav>
        <div className="layout-auth">
          <Link to="/login" className="layout-link">
            LOGIN
          </Link>
          /
          <Link to="/register" className="layout-link">
            REGISTER
          </Link>
        </div>
      </header>
      <main className="layout-main">{children}</main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
