import { useState } from "react"
import "./styles/form.css"
import ExcelJS from "exceljs"
import { useNavigate } from "react-router"

function Form() {
    const [pendingQuestions, setPendingQuestions] = useState([])
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Du måste välja en fil att ladda upp först")
            return;
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
                const imageInSpreedsheet =
                    (typeof firstCell.value === "object" && firstCell.value.hyperlink) ||
                    (typeof firstCell.value === "string" &&
                        firstCell.value.match(/\.(jpg|jpeg|png|gif)$/i))

                if (imageInSpreedsheet) {
                    const image = row.getCell(1).hyperlink || ""
                    const answer = row.getCell(2).value.toString() || ""
                    flashcardContent.push({ image, answer });
                } else {
                    const question = row.getCell(1).value.toString() || ""
                    const answer = row.getCell(2).value.toString() || ""
                    flashcardContent.push({ question, answer })
                }
            })
            setPendingQuestions((previousQuestions) => [
                ...previousQuestions,
                ...flashcardContent,
            ])
        }
        readFile.readAsArrayBuffer(file)
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleRemove = (index) => {
        setPendingQuestions(pendingQuestions.filter((_, i) => i !== index))
    }

    const colors = [
        "#D72638",
        "#3F88C5",
        "#F49D37",
        "#0000FF",
        "#AACC00",
        "#F1C40F",
        "#8E44AD",
        "#2ECC71",
        "#E67E22",
        "#C0392B"
    ]

    const handleFlashcards = () => {
        if (!title.trim()) {
            alert("Du måste ange ett namn på dina flashcards")
            return
        }

        const savedCards = JSON.parse(localStorage.getItem("flashcards")) || {};

        if (Object.prototype.hasOwnProperty.call(savedCards, title)) {
            alert("Det finns redan flashcards sparade under det namnet");
            return
        }

        let allColors = [...colors]

        const flashcards = pendingQuestions.map((card) => {
            if(allColors.length === 0) {
                allColors = [...colors]
            }
            const randomIndex = Math.floor(Math.random() * allColors.length)
            const randomColor = allColors[randomIndex]
            allColors.splice(randomIndex, 1)

            return {
                ...card,
                flipped: false,
                completed:false,
                color: randomColor
            }
        });

        savedCards[title] = flashcards
        localStorage.setItem("flashcards", JSON.stringify(savedCards))

        setPendingQuestions([])
        navigate('/flashcard/saved')
    }

    return (
        <>
            <form className='flashcard__form' onSubmit={handleUpload}>
                <fieldset className='flashcard__fieldset'>
                    <legend>Ladda upp från fil:</legend>
                    <label htmlFor='title'>Titel på flashcards:</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Titel på dina flashcards'
                    />
                    <input id='file' type='file' onChange={handleFileChange} />
                    <input
                        type='submit'
                        value='Ladda upp fil'
                        className='flashcard__submit'
                    />
                </fieldset>
            </form>
            {pendingQuestions.length > 0 && (
                <section className='flashcard__questions'>
                    <h3>Förhandsgranska</h3>
                    {pendingQuestions.map((item, index) => (
                        <section key={index}>
                            {"image" in item ? (
                                <>
                                    <button className="removeFlashcard__btn" onClick={() => handleRemove(index)}>
                                        <img
                                            className='image__section'
                                            src={`${item.image}`}
                                            alt={`${item.answer}`}
                                        />
                                        <span className='answer__section'>{item.answer}</span>
                                        <span>X</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="removeFlashcard__btn" onClick={() => handleRemove(index)}>
                                        <span className='question__section'>{item.question}: </span>
                                        <span className='answer__section'> {item.answer}</span>
                                        <span>X</span>
                                    </button>
                                </>
                            )}
                        </section>
                    ))}
                    <button className="createFlashcard__btn" onClick={handleFlashcards}>Skapa flashcards</button>
                </section>
            )}
        </>
    );
}

export default Form
