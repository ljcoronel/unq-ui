import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { getToken } from "./config/axios.config";
import Tags from "./pages/Tags";
import TagByTagId from "./pages/TagByTagId";
import Purchase from "./pages/Purchase";
import UserProfile from "./pages/UserProfile";
import { getCurrentUser } from "./services/user";
import Game from "./pages/Game.jsx";
import "bootstrap";
import Search from "./pages/Search.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  async function fetchCurrentUser() {
    const userFounded = await getCurrentUser();
    setUser(userFounded);
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentUser();
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn} user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/games/:gameId"
            element={<Game isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/purchase/:total/:cantProductos"
            element={<Purchase user={user} />}
          />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tagId" element={<TagByTagId />} />
          <Route
            path="/users/:userId"
            element={
              <UserProfile currentUser={user} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
