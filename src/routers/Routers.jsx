import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from "../pages/HomePage";
import NewCardPage from '../pages/NewCardsPage';
import SavedCardsPage from '../pages/SavedCardsPage';

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewCardPage />} />
                <Route path="/saved" element={<SavedCardsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers