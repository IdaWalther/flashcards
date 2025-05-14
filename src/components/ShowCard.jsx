import Cardinfo from "./Cardinfo"
import { useState } from "react"

function ShowCard({cards, setCards}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [knownCards, setKnownCards] = useState([]);

    if(!cards || cards.length === 0 & knownCards.length === 0) {
        return <p>Det finns inga kort sparade i denna kategori</p>
    } else if(!cards || cards.length === 0 & knownCards.length > 0) {
        return (
            <section className="announcement-container"> 
                <p>Du har nu memorerat informationen på alla korten</p>
                <p>Vill du träna på dem igen?</p>
            </section>
        )
    }

    return (
        <>
            <section className="card-container"> 
                <Cardinfo 
                    cards = {cards}
                    setCards = {setCards}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    knownCards={knownCards}
                    setKnownCards={setKnownCards}
                />
            </section>
        </>
    )  
}

    export default ShowCard