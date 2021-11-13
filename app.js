console.log('%c PRESS YOUR TESTER', 'font-weight: bold; font-size: 20px;color: red; text-shadow: 1px 1px 0 rgb(217,31,38) , 3px 3px 0 rgb(226,91,14) , 5px 5px 0 rgb(245,221,8)');

// Multiple Choice Question Round
const questionContainer = document.querySelector("#question-container");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
const testerButton = document.querySelector("#tester");
let questionText = document.querySelector("#question");
const messageBox = document.querySelector("#message");
const chancesBox = document.querySelector(".chances-box");
let chancesText = document.querySelector("#chances");
const moneyBox = document.querySelector(".money-box");
let totalMoneyText = document.querySelector("#total-money");
const gameBoxes = document.querySelectorAll(".box")
const stopTesterButton = document.querySelector("#stop-tester")

let mixUpQuestions;
let currentQuestionIndex;
let testerChances = 0;
let questionCount = 0;
let totalMoney = 0


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    getNextQuestion();
});

// start game -> remove hide class from question and choices

const startGame = () => {
    mixUpQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    answerButtons.classList.remove("hide");
    chancesBox.classList.remove("hide")
    getNextQuestion();
};

// mixing up questions and remove previous choices from container
const getNextQuestion = () => {
    resetState();
    displayQuestion(mixUpQuestions[currentQuestionIndex]);
};

const resetState = () => {
    nextButton.classList.add("hide");
    //removes previous question buttons
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

};

// display the question and set if correct answer

const displayQuestion = (question) => {
    questionText.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            button.dataset.chances = answer.chances;
        } else {
            button.dataset.chances = answer.chances;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
};

// event listener for selecting answer
const selectAnswer = (e) => {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    const chancesAmount = selectedButton.dataset.chances;
    testerChances += parseInt(chancesAmount);
    questionCount += 1
    chancesText.innerText = testerChances
    setStatusClass(document.querySelector(".answer-btn"), correct);
    Array.from(answerButtons.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
        button.removeEventListener("click", selectAnswer)
    });
    if (mixUpQuestions.length > currentQuestionIndex + 1 && questionCount < 3) {
        nextButton.classList.remove("hide");
    } else {
        nextButton.classList.add("hide");
        testerButton.classList.remove("hide");
        document.querySelector(".question").classList.add("hide");
        answerButtons.classList.add("hide");
        messageBox.classList.remove("hide");
        messageBox.innerText = `you have ${testerChances} chances to PRESS THE TESTER. Click the tester to begin`;
        moneyBox.classList.remove("hide");


        showGameBoxes();

    }
    if (e.target.dataset.correct == "true") {
        questionText.innerText = "Correct Answer!";
    } else { questionText.innerText = "Wrong Answer!"; }
};

// remove hide class from game boxes
const showGameBoxes = () => {
    // const gameBoxes = document.querySelectorAll(".box")
    gameBoxes.forEach(box => {
        if (box.classList.contains("hide")) {
            box.classList.remove("hide")
        }
        box.innerText = box.dataset.text;
        // if (box.dataset.text === "BUG") {
        //     box.innerHTML = `<i class=" far fa-bug"></i>`
        // }
    })
}
// setting styles for right or wrong

const setStatusClass = (element, correct) => {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// clearing up the status for next question
const clearStatusClass = (element) => {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

// set questions in array of objects
const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true, chances: 3 },
            { text: "6", correct: false, chances: 1 },
            { text: "20", correct: false, chances: 1 },
        ],
    },
    {
        question: "What is 4 + 4?",
        answers: [
            { text: "16", correct: false, chances: 1 },
            { text: "8", correct: true, chances: 3 },
            { text: "44", correct: false, chances: 1 },
        ],
    },
    {
        question: "What is 5 + 5?",
        answers: [
            { text: "25", correct: false, chances: 1 },
            { text: "10", correct: true, chances: 3 },
            { text: "55", correct: false, chances: 1 },
        ],
    },
    {
        question: "What is 6 + 6?",
        answers: [
            { text: "36", correct: false, chances: 1 },
            { text: "12", correct: true, chances: 3 },
            { text: "66", correct: false, chances: 1 },
        ],
    },
];

startGame();

// start Tester Game Here

// every time user presses Tester
    // subtract from chances
    // randomly apply .lit-border class
    // show STOP TESTER button
        // grab the dataset.value of the box that stops (if box has class .lit-border)
            // box with value, add the value to #total-money
            // GO AGAIN, add 1 to chances
            // BUG, set money to $0
    // after each chance display message
        // what happened on previous round (last dataset.value)
        // add buttons for user to continue or stop
            // if continue, close the message screen (or message to press tester)
            // if stop, game over -> player wins
// if chances = 0
    // game over screen
        // if total money not 0, display message of win
// if total bugs = 4
    // game over screen with loosing message

// My getters: gameBoxes is all boxes 
    //  testerButton is the button
    // totalMoneyText is the dom element
    // totalMoney is the count
    // stoTesterButton is stop button

let boxId, boxValue, boxType
let intervalID = null

function randomLightUpBox() {
    gameBoxes.forEach(box => {
        box.classList.remove("lit-border")
    })
    let randomBox = gameBoxes[Math.floor(Math.random() * 19)]
    randomBox.classList.add("lit-border")
    boxId = randomBox.id

}

function startTester() {

    testerButton.classList.add("hide")
    stopTesterButton.classList.remove("hide")
    intervalID = setInterval(randomLightUpBox, 1000)

}

function stopTester() {
    testerChances--
    chancesText.innerText = testerChances
    stopTesterButton.classList.add("hide")
    testerButton.classList.remove("hide")
    gameBoxes.forEach(box => {
        if (box.id == boxId) {
            boxValue = box.dataset.value
            boxType = box.dataset.type
            // console.log(`box id: ${boxId}, boxValue: ${boxValue}, boxType: ${boxType}`)
            // console.log("testing variable:", boxType, boxValue)
            if (boxType === "money") {
                totalMoney += parseInt(boxValue)
                totalMoneyText.innerText = totalMoney
                // console.log("inside if statement", totalMoney)
            }
            else if (boxType === "bug") {
                totalMoney = 0
                totalMoneyText.innerText = totalMoney
                // console.log("inside if statement", totalMoney)
            }
            else if (boxType === "chance") {
                testerChances += 1
                console.log("inside if statement", testerChances)
                chancesText.innerText = testerChances
            }
        }
    })
    clearInterval(intervalID)
}

testerButton.addEventListener("click", startTester)

stopTesterButton.addEventListener("click", stopTester)

