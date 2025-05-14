import { useState } from "react"
import './form.css'
import ExcelJS from 'exceljs'

function Form({ setCards, setShowForm, setShowSavedFlashcard, setShowNewFlashcard }) {
    const [pendingQuestions, setPendingQuestions] = useState([]);
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')

    const handleUpload = (e) => {
        e.preventDefault()
        if (!file) {
            alert('Du måste välja en fil att ladda upp först')
            return
        }

        const readFile = new FileReader()

        readFile.onload = async (event) => {
            const content = event.target.result

            const workbook = new ExcelJS.Workbook()
            await workbook.xlsx.load(content)
            const worksheet = workbook.worksheets[0]
            const flashcardContent = []

            worksheet.eachRow((row) => {
                const firstCell = row.getCell(1)
                const imageInSpreedsheet = typeof firstCell.value === 'object' && firstCell.value.hyperlink || typeof firstCell.value === 'string' && firstCell.value.match(/\.(jpg|jpeg|png|gif)$/i)

                if (imageInSpreedsheet) {
                    const image = row.getCell(1).hyperlink || ''
                    const answer = row.getCell(2).value.toString() || ''
                    flashcardContent.push({ image, answer })
                    console.log('Inside image')
                } else {
                    const question = row.getCell(1).value.toString() || ''
                    const answer = row.getCell(2).value.toString() || ''
                    flashcardContent.push({ question, answer })
                    console.log('vanlig')
                }
            })
            setPendingQuestions(previousQuestions => [...previousQuestions, ...flashcardContent])
        }
        readFile.readAsArrayBuffer(file)
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleRemove = (index) => {
        setPendingQuestions(pendingQuestions.filter((_, i) => i !== index));
    };

    const handleFlashcards = () => {
        if (!title.trim()) {
            alert('Du måste ange ett namn på dina flashcards')
            return
        }
        const savedCards = JSON.parse(localStorage.getItem('flashcards')) || {}

        if (Object.prototype.hasOwnProperty.call(savedCards, title)) {
            alert('Det finns redan flashcards sparade under det namnet')
            return
        }
        const flashcards = pendingQuestions.map(card => ({
            ...card,
            flipped: false
        }))
        savedCards[title] = flashcards
        localStorage.setItem('flashcards', JSON.stringify(savedCards))


        setCards(previousCards => [...previousCards, ...flashcards])
        setShowForm(false)
        setPendingQuestions([])
        setShowSavedFlashcard(true)
        setShowNewFlashcard(false)
    }

    return (
        <>
            <form className="flashcard__form" onSubmit={handleUpload}>
                <fieldset className="flashcard__fieldset">
                    <legend>Ladda upp från fil:</legend>
                    <label htmlFor="title">Titel på flashcards:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titel på dina flashcards"
                    />
                    <input id="file" type="file"
                        onChange={handleFileChange}
                    />
                    <input
                        type="submit"
                        value="Ladda upp fil"
                        className="flashcard__submit" />
                </fieldset>
            </form>
            {pendingQuestions.length > 0 && (
                <section className="flashcard__questions">
                    <h3>Förhandsgranska</h3>
                    {pendingQuestions.map((item, index) => (
                        <section key={index}>
                            {'image' in item ? (
                                <>
                                    <img className="image__section" src={`${item.image}`} alt={`${item.answer}`} />
                                    <span className="answer__section">{item.answer}</span>
                                    <button onClick={() => handleRemove(index)}>X</button>
                                </>
                            ) : (
                                <>
                                    <span className="question__section">{item.question}: </span>
                                    <span className="answer__section"> {item.answer}</span>
                                    <button onClick={() => handleRemove(index)}>X</button>
                                </>
                            )}
                        </section>
                    ))}
                    <button onClick={handleFlashcards}>
                        Skapa flashcards
                    </button>
                </section>
            )}
        </>
    )
}

export default Form