import FlashCard from "./components/FlashCard"
import SavedCard from "./components/SavedCard"
import { useState } from "react";
import './app.css'

function App() {
    const [showSavedFlashcard, setShowSavedFlashcard] = useState(false)
    const [showNewFlashcard, setShowNewFlashcard] = useState(false)

    const handleShowFlashcard = () => {
        setShowNewFlashcard(true)
        setShowSavedFlashcard(false)
    }

    const handleRemoveFlashcard = () => {
        setShowNewFlashcard(false)
    }

    const handleShowSavedFlashcard = () => {
        setShowSavedFlashcard(true)
        setShowNewFlashcard(false)
    }

    const handleRemoveSaveFlashcard = () => {
        setShowSavedFlashcard(false)
    }

    return (
        <>
            {!(showNewFlashcard || showSavedFlashcard) && (
                <>
                    <h1 className="header">Övningar</h1>
                    <button className="setup-flashcard-btn" onClick={handleShowFlashcard}>Skapa nya Flash cards</button>
                    <button className="setup-flashcard-btn" onClick={handleShowSavedFlashcard}>Visa Flash cards</button>
                </>
            )}
            {showNewFlashcard && (
                <>
                    <button className="close-flashcard-btn" onClick={handleRemoveFlashcard}>Stäng</button>
                    <FlashCard
                        setShowSavedFlashcard={setShowSavedFlashcard}
                        setShowNewFlashcard={setShowNewFlashcard}
                    />
                </>
            )}
            {showSavedFlashcard && (
                <>
                    <button className="close-flashcard-btn" onClick={handleRemoveSaveFlashcard}>Stäng</button>
                    <SavedCard />
                </>
            )}

        </>
    )
}

export default App
