import { useEffect, useState } from "react"
import ShowCard from "./ShowCard"
import { useNavigate } from "react-router"

function SavedCard() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const saved = localStorage.getItem("flashcards")
        if (saved) {
            try {
            const parsed = JSON.parse(saved)
            setCategories(Object.keys(parsed))
            } catch(error) {
                console.error(error)
                setCategories([])
            }
        }
    }, [])


    const removeCategory = (index) => {
        const remove = categories[index]
        const saved = JSON.parse(localStorage.getItem("flashcards")) || {}
        delete saved[remove]
        localStorage.setItem("flashcards", JSON.stringify(saved))
        const updatedCategories = categories.filter((_, i) => i !== index)
        setCategories(updatedCategories)
    }

    const handleOpenCategory = (category) => {
        navigate(`/flashcard/saved/${category}`)
    }

    return (
                <>
                    <h1>Visa kategorier</h1>
                    <section className='showFlashcardCategories'>
                        {categories.length === 0 && <p>Du har inga sparade flashcards</p>}
                        {categories.map((category, index) => (
                            <section key={index}>
                                <button
                                    onClick={() => handleOpenCategory(category)}
                                    className='category__btn'
                                >
                                    {category}
                                </button>
                                <button className="removeCategory__btn" onClick={() => removeCategory(index)}>X</button>
                            </section>
                        ))}
                    </section>
                </>
        );
}

export default SavedCard;
