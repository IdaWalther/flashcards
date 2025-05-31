import { use, useState } from "react"
import "./styles/form.css"
import ExcelJS from "exceljs"
import { useNavigate } from "react-router"

function Form() {
    const [pendingQuestions, setPendingQuestions] = useState([])
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const handleUpload = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setErrorMessage('Du måste ange en titel');
            return;
        }
        if (!file) {
            setErrorMessage('Du måste välja en fil att ladda upp')
            return;
        }
        if (!file.name.endsWith('.xlsx')) {
            setErrorMessage('Endast .xlsx-filer är tillåtna')
            return;
        }
        setErrorMessage('')
        const readFile = new FileReader()
        readFile.onload = async (event) => {
            const content = event.target.result
            const workbook = new ExcelJS.Workbook()
            await workbook.xlsx.load(content)
            const worksheet = workbook.worksheets[0]
            if (worksheet.rowCount === 0 || worksheet.actualRowCount === 0) {
                setErrorMessage("Filen är tom. Välj en annan fil")
                return
            }
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
        '#EEE9E9', //snow2
        '#BC8F8F', //rosybrown
        '#CD5C5C', //indianred
        '#FF0000', //red
        '#FFCCCC', //flatpink
        '#D44942', //chili
        '#CDB7B5', //mistyrose3
        '#FA8072', //salmon
        '#FF6600', //orange
        '#A68064', //medium wood
        '#C77826', //goldochre
        '#EED5B7', //bisque2
        '#FFB90F', //darkgoldenrod1
        '#FCD116', //Sign yellow
        '#F0E68C', //khaki
        '#FFFF00', //yellow
        '#D1E231', //pear
        '#9CBA7F', //mint candy
        '#32CD32', //limegreen
        '#66CDAA', //mediumawuamarine
        '#40E0D0', //turquoise
        '#90FEFB', //cool mint
        '#05B8CC', //cerulean
        '#74BBFB', //blue oce
        '#74BBFB', //nikko blue
        '#0000FF', //blue
        '#6A5ACD', //slateblue
        '#9370DB', //mediumpurple
        '#A020F0', //purple
        '#D8BFD8', //thistle
        '#DB70DB', //orchid
        '#FF00CC', //rose
        '#F7B3DA', //cotton candy
        '#FF69B4', //hotpink
        '#FF0033' //bright red
    ]
    const handleFlashcards = () => {
        const savedCards = JSON.parse(localStorage.getItem("flashcards")) || {};
        if (Object.prototype.hasOwnProperty.call(savedCards, title)) {
            setErrorMessage("Det finns redan flashcards sparade under det namnet");
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            return
        }
        let allColors = [...colors]
        const flashcards = pendingQuestions.map((card) => {
            if (allColors.length === 0) {
                allColors = [...colors]
            }
            const randomIndex = Math.floor(Math.random() * allColors.length)
            const randomColor = allColors[randomIndex]
            allColors.splice(randomIndex, 1)
            return {
                ...card,
                flipped: false,
                completed: false,
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
                        accept=".xlsx"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Titel på dina flashcards'
                    />
                    <input id='file' type='file' onChange={handleFileChange} />
                    <p className="file__info">
                        Filen ska vara en .xlsx fil med två kolumner.
                    </p>
                    <p className="file__info">
                        Kolumn 1 ska innehålla en fråga eller bildlänk (JPEG, PNG, GIF).
                    </p>
                    <p className="file__info">
                        Kolumn 2 ska innehålla ett svar.
                    </p>
                    <input
                        type='submit'
                        value='Ladda upp fil'
                        className='flashcard__submit'
                    />
                    <p className="errorMsg">{errorMessage}</p>
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
