import { useEffect, useState } from "react"
import ShowCard from "./ShowCard"

function SavedCard() {
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState(null)
    const [cards, setCards] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem("flashcards")
        if (saved) {
            const parsed = JSON.parse(saved)
            setCategories(Object.keys(parsed))
        }
    }, [])

    useEffect(() => {
        if (selected) {
            const savedCards = JSON.parse(localStorage.getItem("flashcards"))
            const themeCards = savedCards[selected] || []
            setCards(themeCards)
        }
    }, [selected])

    const removeCategory = (index) => {
        const remove = categories[index]
        const saved = JSON.parse(localStorage.getItem("flashcards")) || {}
        delete saved[remove]
        localStorage.setItem("flashcards", JSON.stringify(saved))
        const updatedCategories = categories.filter((_, i) => i !== index)
        setCategories(updatedCategories)
    }
    
    return (
        <>
            {!selected && (
                <>
                    <h1>Visa kategorier</h1>
                    <section className='showFlashcardCategories'>
                        {categories.length === 0 && <p>Du har inga sparade flashcards</p>}
                        {categories.map((category, index) => (
                            <section key={index}>
                                <button
                                    onClick={() => setSelected(category)}
                                    className='category__btn'
                                >
                                    {category}
                                </button>
                                <button onClick={() => removeCategory(index)}>X</button>
                            </section>
                        ))}
                    </section>
                </>
            )}
            {selected && (
                <ShowCard category={selected} cards={cards} setCards={setCards} />
            )}
        </>
    );
}

export default SavedCard;
