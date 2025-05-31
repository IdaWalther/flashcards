import { useNavigate } from "react-router"
import "./styles/SuccessPage.css"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

function SuccessPage() {
    const { width, height } = useWindowSize()
    const navigate = useNavigate()
    return (
        <>
            <Confetti width={width} height={height} />
            <section className="announcement-container">
                <h1>Grymt jobbat!</h1>
                <p className="successPage_text">Du har nu memorerat informationen på alla kort</p>
                <section className="success__buttons">
                    <button className="successPage__btn" onClick={() => navigate(-1)}>Öva igen</button>
                    <button className="successPage__btn" onClick={() => navigate("/flashcard")}>Gå till startsidan</button>
                </section>
            </section>
        </>
    )
}

export default SuccessPage
