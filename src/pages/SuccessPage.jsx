import { useNavigate } from "react-router"
import "./styles/SuccessPage.css"

function SuccessPage() {
    const navigate = useNavigate()
    return (
        <>
            <section className="announcement-container">
                <h2>Grymt jobbat!</h2>
                <p>Du har nu memorerat informationen på alla kort</p>
                <section className="success__buttons">
                    <button className="successPage__btn" onClick={() => navigate(-1)}>Öva igen</button>
                    <button className="successPage__btn" onClick={() => navigate("/flashcard")}>Gå till startsidan</button>
                </section>
            </section>
        </>
    )
}

export default SuccessPage
