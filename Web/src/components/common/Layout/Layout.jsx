import { Search, ShoppingCart } from "lucide-react";
import { classNames } from "../../../utils/classNames";
import { Link, useLocation, useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import "./Layout.css";

export default function Layout({ children, isLoggedIn, user }) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const NAVIGATION_ITEMS = [
    { name: "STORE", path: "/", show: true },

    {
      name: "LIBRARY",
      path: `/users/${user?.id}`,
      show: isLoggedIn && !!user,
    },
  ];

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-left">
          <Link to="/">
            <img src="/gog.png" alt="GOG Logo" className="layout-logo" />
          </Link>
        </div>
        <nav className="layout-nav">
          {NAVIGATION_ITEMS.filter((item) => item.show).map((item) => (
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

          <form
            name="search"
            onSubmit={(e) => {
              e.preventDefault();
              const searchQuery = e.target.elements[0].value.trim();
              if (searchQuery) {
                navigate(`/search?query=${searchQuery}`);
              }
              e.target.reset();
              e.target.blur();
            }}
            className="layout-search"
          >
            <Search className="search-icon" />
            <input type="text" placeholder="SEARCH" />
          </form>
        </nav>
        {isLoggedIn ? (
          <div className="layout-auth">
            <Link to="/cart">
              <ShoppingCart size={30} color="white" />
            </Link>
            {user && (
              <Link to={`/users/${user.id}`}>
                <img src={user.image} alt={user.name} className="user-avatar" />
              </Link>
            )}
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
