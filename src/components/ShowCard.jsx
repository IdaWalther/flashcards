import Cardinfo from "./Cardinfo"
import { useState } from "react"

function ShowCard({cards, setCards}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    if(!cards || cards.length === 0) {
        return <p>Det finns inga kort sparade i denna kategori</p>
    }

    return (
        <>
            <section className="card-container"> 
                <Cardinfo 
                    cards = {cards}
                    setCards = {setCards}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            </section>
        </>
    )  
}

    export default ShowCard