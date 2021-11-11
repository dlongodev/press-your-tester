// Multiple Choice Question Round
const questionContainerElement = document.querySelector("#question-container")
const answerButtonsElement = document.querySelector("#answer-buttons")
const nextButton = document.querySelector("#next-btn")
let questionElement = document.querySelector("#question")
let shuffleQuestions, currentQuestionIndex
let chances = 0


function startGame() {
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    answerButtonsElement.classList.remove("hide")
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("answer-btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
            // console.log(answer.correct)
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.querySelector(".answer-btn"), correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true, chances: 3 },
            { text: "6", correct: false, chances: 1 },
            { text: "20", correct: false, chances: 1 }
        ]
    },
    {
        question: "What is 3 + 3?",
        answers: [
            { text: "4", correct: false, chances: 1 },
            { text: "6", correct: true, chances: 3 },
            { text: "22", correct: false, chances: 1 }
        ]
    }
]


startGame()