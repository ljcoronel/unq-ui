import React, { useState } from "react";
import "./Layout.css";
import { LogOut, Search, ShoppingCart } from "lucide-react";
import { classNames } from "../../../utils/classNames";
import { Link, useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { removeToken } from "../../../config/axios.config";

export default function Layout({ children, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
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
        {isLoggedIn ? (
          <div className="layout-auth">
            <Link to="/cart">
              <ShoppingCart size={30} color="white" />
            </Link>
            <button
              className="layout-logout"
              onClick={() => {
                removeToken();
                setIsLoggedIn(false);
                navigate("/login");
              }}
            >
              <LogOut size={20} color="white" />
            </button>
          </div>
        ) : (
          <div className="layout-auth">
            <Link to="/login" className="layout-link">
              LOGIN
            </Link>
            /
            <Link to="/register" className="layout-link">
              REGISTER
            </Link>
          </div>
        )}
      </header>
      <main className="layout-main">{children}</main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
