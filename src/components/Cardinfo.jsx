import { useState, useEffect } from "react"
import "./styles/cardinfo.css"

function Cardinfo({
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    knownCards,
    setKnownCards,
    can,
    setCan,
}) {
    const card = cards[currentIndex]
    const [left, setLeft] = useState(cards.filter(card => !card.completed).length)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        const checkCardsLeft = cards.filter(card => !card.completed).length
        setLeft(checkCardsLeft)

        if(left === 0) {
            setFinished(true)
        }
    }, [cards])

    const flipCard = () => {
        setCards((previousCards) =>
            previousCards.map((card, i) =>
                i === currentIndex ? { ...card, flipped: !card.flipped } : card
            )
        );
    };

    const unknown = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    };

    const known = () => {
            const isKnown = cards[currentIndex].completed
            if(!isKnown) {
                setCan((previousCan) => previousCan + 1)
            }
        setCards((previousCards) => {
            const isKnown = previousCards[currentIndex].completed

            const updatedCards = previousCards.map((card, i) =>
                i === currentIndex ? { ...card, completed: true } : card
            )

            const nextCard = updatedCards.findIndex((card, i) => !card.completed && i > currentIndex)
            const backToStart = updatedCards.findIndex((card) => !card.completed)

            if (nextCard !== -1) {
                setCurrentIndex(nextCard)
            } else if (backToStart !== -1) {
                setCurrentIndex(backToStart)
            } else {
                setCurrentIndex(0)
            }

            return updatedCards
        })

        // const knownCard = cards[currentIndex]
        // setKnownCards((previousCards) => [...previousCards, knownCard])
        // const newCards = cards.filter((_, i) => i !== currentIndex)
        // setCards(newCards)

        // if (newCards.length === 0) {
        //     setCurrentIndex(0)
        // } else if (currentIndex >= newCards.length) {
        //     setCurrentIndex(0)
        // }
    }

    return (
        <div className='flashcard__wrapper'>
            <article className='flashcard' onClick={flipCard}>
                <section className={`star ${card.completed ? "completed" : ""}`}>Star</section>
                <section className={`card ${card.flipped ? "flipped" : ""}`}>
                    {card.image ? (
                        <section className='front'>
                            <img className='front__image' src={`${card.image}`} />
                        </section>
                    ) : (
                        <section className='front'>{card.question}</section>
                    )}
                    <section className='back'>{card.answer}</section>
                </section>
            </article>
            <section>
                <section>
                    <button className='change-card__btn' onClick={unknown}>
                        &rarr;
                    </button>
                    <button className='change-card__btn' onClick={known}>
                        &#x2713;
                    </button>
                </section>
            </section>
            <section className='showcase-left'>Left: {left}</section>
            <section className='showcase-can'>&#x2713; {can}</section>
        </div>
    );
}

export default Cardinfo
