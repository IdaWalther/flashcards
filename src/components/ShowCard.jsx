import Cardinfo from "./Cardinfo"
import { useState } from "react"
import { useNavigate } from "react-router"

function ShowCard({ cards, setCards }) {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [knownCards, setKnownCards] = useState([])
    const [can, setCan] = useState(0)

    if (!cards || cards.length === 0 && knownCards.length === 0) {
        return <p>Det finns inga kort sparade i denna kategori</p>
    } else if (!cards || cards.length === 0 && knownCards.length > 0) {
        navigate('/flashcard/success')
    }

    return (
        <>
            <section className="card-container">
                <Cardinfo
                    cards={cards}
                    setCards={setCards}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    knownCards={knownCards}
                    setKnownCards={setKnownCards}
                    can={can}
                    setCan={setCan}
                />
            </section>
        </>
    )
}

export default ShowCard