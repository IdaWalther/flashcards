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
    const [alreadyFinished, setAlreadyFinished] = useState(false)

    useEffect(() => {
        const checkCardsLeft = cards.filter(card => !card.completed).length
        setLeft(checkCardsLeft)

        if (finished) {
            const timer = setTimeout(() => {
                setFinished(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [cards])

    const flipCard = () => {
        setCards((previousCards) =>
            previousCards.map((card, i) =>
                i === currentIndex ? { ...card, flipped: !card.flipped } : card
            )
        );
    };

    const changeCard = (updatedCards) => {
        const nextCard = updatedCards.findIndex((card, i) => !card.completed && i > currentIndex)
        const backToStart = updatedCards.findIndex((card) => !card.completed)

        if (nextCard !== -1) {
            setCurrentIndex(nextCard)
        } else if (backToStart !== -1) {
            setCurrentIndex(backToStart)
        } else {
            setCurrentIndex((currentIndex + 1) % cards.length)
        }
    }

    const known = () => {
        const isKnown = cards[currentIndex].completed
        if (!isKnown) {
            setCan((previousCan) => previousCan + 1)
        }

        const updatedCards = cards.map((card, i) =>
            i === currentIndex ? { ...card, completed: true } : card
        )

        const completed = updatedCards.every(card => card.completed);
        if (completed && !alreadyFinished) {
            setFinished(true)
            setAlreadyFinished(true)
        }

        setCards(updatedCards)
        changeCard(updatedCards)
    }

    return (
        <div className='flashcard__wrapper'>
            {finished && (
                <div className="fireworks">
                    🎆🎇🎉 Du klarade alla kort! 🎉🎇🎆
                </div>
            )}
            <article className='flashcard' onClick={flipCard}>
                <section className={`card ${card.flipped ? "flipped" : ""}`}>
                    {card.image ? (
                        <section className='front'>
                            <section className={`star ${card.completed ? "completed" : ""}`}>&#9733;</section>
                            <img className='front__image' src={`${card.image}`} />
                            <section className="magnifyingGlas">&#128269;</section>
                        </section>
                    ) : (
                        <>
                            <section className={`star ${card.completed ? "completed" : ""}`}>&#9733;</section>
                            <section className='front'>{card.question}</section>
                        </>
                    )}
                    <section className='back'>{card.answer}</section>
                </section>
            </article>
            <section>
                <section>
                    <button className='change-card__btn' onClick={() => changeCard(cards)}>
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
