import Cardinfo from "./Cardinfo"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function ShowCard() {
    const { category } = useParams()
    const [cards, setCards] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [can, setCan] = useState(0)
    useEffect(() => {
        const saved = localStorage.getItem("flashcards")
        if (saved) {
            const parsed = JSON.parse(saved)
            const loadedCards = parsed[category] || []
            setCards(loadedCards)
        }
    }, [category])
    if (!cards || cards.length === 0) {
        return <p>Det finns inga kort sparade i denna kategori</p>
    }
    return (
        <>
            <section className="card-container">
                <Cardinfo
                    cards={cards}
                    setCards={setCards}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    can={can}
                    setCan={setCan}
                />
            </section>
        </>
    )
}

export default ShowCard