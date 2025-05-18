import { BrowserRouter, Routes, Route } from "react-router";
import Game from "./pages/Game.jsx";
import Tags from "./pages/Tags.jsx";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/games/:gameId" element={<Game/>}/>
                <Route path="/tags/:id" element={<Tags />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;