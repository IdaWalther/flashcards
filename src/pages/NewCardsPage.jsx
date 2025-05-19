import { useNavigate } from "react-router"
import "./styles/HomePage.css"
import Form from "../components/Form"

function NewCardPage() {
    const navigate = useNavigate()

    const handleClosePage = () => {
        navigate('/flashcard')
    }

    return (
        <>
            <button className="close-flashcard-btn" onClick={handleClosePage}>Stäng</button>
            <Form/>
        </>
    )
}

export default NewCardPage
