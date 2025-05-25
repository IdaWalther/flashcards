import { useState, useEffect } from "react"
import "./styles/cardinfo.css"
import { useNavigate } from "react-router"

function Cardinfo({
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    can,
    setCan,
}) {
    const card = cards[currentIndex]
    const [left, setLeft] = useState(cards.filter(card => !card.completed).length)
    const [finished, setFinished] = useState(false)
    const [alreadyFinished, setAlreadyFinished] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [enlargeImage, setEnlargeImage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const checkCardsLeft = cards.filter(card => !card.completed).length
        setLeft(checkCardsLeft)

        if (finished) {
            navigate('/flashcard/success')
        }
    }, [cards, finished])

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

    const enlarge = (event) => {
        event.stopPropagation()
        setShowImage(true)
        setEnlargeImage(card.image)
    }

    return (
        <div className='flashcard__wrapper'>
            {showImage && (
                <div className="showimage-wrapper" onClick={() => setShowImage(false)}>
                    <div className="showimage-content" onClick={(e) => e.stopPropagation()}>
                        <img src={enlargeImage} alt="Förstorad" className="enlarge-image" />
                        <button className="showimage-closeBtn" onClick={() => setShowImage(false)}>✖</button>
                    </div>
                </div>
            )}
            <article className='flashcard' onClick={flipCard}>
                <section className={`card ${card.flipped ? "flipped" : ""}`}>
                    {card.image ? (
                        <section className='front' style={{ backgroundColor: card.color }} >
                            {/* <section className={`star ${card.completed ? "completed" : ""}`}>&#9733;</section> */}
                            <img className='front__image' src={`${card.image}`} />
                            <section className="magnifyingGlas" onClick={enlarge}>&#128269;</section>
                        </section>
                    ) : (
                        <>
                            {/* <section className={`star ${card.completed ? "completed" : ""}`}>&#9733;</section> */}
                            <section className='front' style={{ backgroundColor: card.color }}>{card.question}</section>
                        </>
                    )}
                    <section className='back' style={{ backgroundColor: card.color }}>{card.answer}</section>
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
