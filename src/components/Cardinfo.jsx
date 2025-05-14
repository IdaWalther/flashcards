import { useEffect } from 'react';
import './cardinfo.css'

function Cardinfo({ cards, setCards, currentIndex, setCurrentIndex, knownCards, setKnownCards, can, setCan }) {
    const card = cards[currentIndex];

    const flipCard = () => {
        setCards(previousCards =>
            previousCards.map((card, i) =>
                i === currentIndex ? { ...card, flipped: !card.flipped } : card
            )
        )
    }

    const unknown = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0)
        }
    }

    const known = () => {
        setCan(previousCan => previousCan + 1)
        const knownCard = cards[currentIndex];
        setKnownCards(previousCards => [...previousCards, knownCard])

        const newCards = cards.filter((_, i) => i !== currentIndex)

        setCards(newCards)

        if (newCards.length === 0) {
            setCurrentIndex(0);
        } else if (currentIndex >= newCards.length) {
            setCurrentIndex(0)
        }
    }

    useEffect(() => {
        console.log(knownCards)
    }, [knownCards])
    return (
        <div className="flashcard__wrapper">
            <article className="flashcard" onClick={flipCard}>
                <section className={`card ${card.flipped ? 'flipped' : ''}`}>
                    {card.image ? (
                        <section className="front"><img className="front__image" src={`${card.image}`} /></section>
                    ) : (
                        <section className="front">{card.question}</section>
                    )}
                    <section className="back">{card.answer}</section>
                </section>
            </article>
            <section>
                <section><button className="change-card__btn" onClick={unknown}>
                    Practice more
                </button>
                    <button className="change-card__btn" onClick={known}>
                        &#x2713;
                    </button>
                </section>
            </section>
            <section className="showcase-left">Left: {cards.length}</section>
            <section className="showcase-can">&#x2713; {can}</section>
        </div>
    )
}

export default Cardinfo