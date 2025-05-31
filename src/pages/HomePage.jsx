import { useNavigate } from "react-router"
import "./styles/HomePage.css"

function HomePage() {
    const navigate = useNavigate()
    const handleShowFlashcard = () => {
        navigate('/flashcard/new')
    }
    const handleShowSavedFlashcard = () => {
        navigate('/flashcard/saved')
    }
    return (
        <>
            <h1 className="header">Övningar</h1>
            <button className="setup-flashcard-btn" onClick={handleShowFlashcard}>Skapa nya Flash cards</button>
            <button className="setup-flashcard-btn" onClick={handleShowSavedFlashcard}>Visa Flash cards</button>
        </>
    )
}

export default HomePage
