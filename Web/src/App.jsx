import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { getToken } from "./config/axios.config";
import Tags from "./pages/Tags";
import TagByTagId from "./pages/TagByTagId";
import Purchase from "./pages/Purchase"
import UserProfile from "./pages/UserProfile";
import Api from "./services/user";
import Game from "./pages/Game.jsx";
import "bootstrap"

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);

  async function fetchCurrentUser() {
    const userFounded = await Api.getCurrentUser();
    setUser(userFounded);
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentUser();
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/games/:gameId" element={<Game isLoggedIn={isLoggedIn}/>} />
          <Route path="/register" element={<Register setIsLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase/:total/:cantProductos" element={<Purchase/>}/>
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tagId" element={<TagByTagId />} />
          <Route path="/users/:userId" element={<UserProfile currentUser={user} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
