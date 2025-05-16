import FlashCard from "../components/FlashCard"
import { useNavigate } from "react-router"
import "./styles/HomePage.css"

function NewCardPage() {
    const navigate = useNavigate()
    
    const handleClosePage = () => {
        navigate('/')
    }

    return (
        <>
            <button className="close-flashcard-btn" onClick={handleClosePage}>Stäng</button>
            <FlashCard/>
        </>
    )
}

export default NewCardPage
