import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from "../pages/HomePage";
import NewCardPage from '../pages/NewCardsPage';
import SavedCardsPage from '../pages/SavedCardsPage';
import SuccessPage from '../pages/SuccessPage';
import ShowCard from '../components/ShowCard';

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/flashcard" element={<HomePage />} />
                <Route path="/flashcard/new" element={<NewCardPage />} />
                <Route path="/flashcard/saved" element={<SavedCardsPage />} />
                <Route path="/flashcard/success" element={<SuccessPage/>} />
                <Route path="/flashcard/saved/:category" element={<ShowCard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers