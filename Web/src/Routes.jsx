import { BrowserRouter, Routes, Route } from "react-router";

export const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="game" element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    );
};
