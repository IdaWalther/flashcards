import Cardinfo from "./Cardinfo"
import Form from "./Form"
import { useState } from "react"

function FlashCard({setShowSavedFlashcard, setShowNewFlashcard}) {
    const [cards, setCards] = useState([])
    //const [currentIndex, setCurrentIndex] = useState(0);
    const [showForm, setShowForm] = useState(true)

    return (
        <>
        {showForm && (
            <Form
                setCards = {setCards}
                setShowForm = {setShowForm}
                setShowSavedFlashcard={setShowSavedFlashcard}
                setShowNewFlashcard={setShowNewFlashcard}
            />  
        )}
        </>
    )  
}

    export default FlashCard