import Form from "./Form"
import { useState } from "react"

function FlashCard({ setShowSavedFlashcard, setShowNewFlashcard }) {
    const [cards, setCards] = useState([])
    const [showForm, setShowForm] = useState(true)

    return (
        <>
            {showForm && (
                <Form
                    cards={cards}
                    setCards={setCards}
                    setShowForm={setShowForm}
                    setShowSavedFlashcard={setShowSavedFlashcard}
                    setShowNewFlashcard={setShowNewFlashcard}
                />
            )}
        </>
    )
}

export default FlashCard