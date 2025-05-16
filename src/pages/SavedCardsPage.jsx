import SavedCard from "../components/SavedCard"
import { useNavigate } from "react-router"
function SavedCardsPage() {

    const navigate = useNavigate()
    
    const handleClosePage = () => {
        navigate('/')
    }
    return (
        <>
            <button className="close-flashcard-btn" onClick={handleClosePage}>Stäng</button>
            <SavedCard />
        </>
    )
}

export default SavedCardsPage
