console.log('%c PRESS YOUR TESTER', 'font-weight: bold; font-size: 20px;color: red; text-shadow: 1px 1px 0 rgb(217,31,38) , 3px 3px 0 rgb(226,91,14) , 5px 5px 0 rgb(245,221,8)')

const questionContainer = document.querySelector("#question-container")
const answerButtons = document.querySelector("#answer-buttons")
const nextButton = document.querySelector("#next-btn")
const testerButton = document.querySelector("#tester")
let questionText = document.querySelector("#question")
const messageBox = document.querySelector("#message")
const chancesBox = document.querySelector(".chances-box")
let chancesText = document.querySelector("#chances")
const moneyBox = document.querySelector(".money-box")
let totalMoneyText = document.querySelector("#total-money")
const gameBoxes = document.querySelectorAll(".box")
const stopTesterButton = document.querySelector("#stop-tester")
const bugCountDisplay = document.querySelector("#bug-count-display")
const restartButton = document.querySelector("#restart")
const collectMoneyButton = document.querySelector("#collect")



let mixUpQuestions
let currentQuestionIndex
let testerChances = 0
let questionCount = 0
let totalMoney = 0
let bugCount = 0

// loading Sounds
correctSound = new Audio("sounds/correct.mp3")
wrongSound = new Audio("sounds/wrong.mp3")
testingSound = new Audio("sounds/glitchy.mp3")
bugSound = new Audio("sounds/coding-bug.mp3")
chanceSound = new Audio("sounds/tada.mp3")
moneySound = new Audio("sounds/cha-ching.mp3")
winSound = new Audio("sounds/applause.mp3")
loseSound = new Audio("sounds/sad-crowd.mp3")
quitSound = new Audio("sounds/small-clap.mp3")


// Multiple Choice Question Round

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    getNextQuestion();
})

// start game -> remove hide class from question and choices

const startGame = () => {
    mixUpQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    answerButtons.classList.remove("hide");
    chancesBox.classList.remove("hide")
    getNextQuestion();
}

// mixing up questions and remove previous choices from container
const getNextQuestion = () => {
    resetState();
    displayQuestion(mixUpQuestions[currentQuestionIndex]);
}

//removes previous question buttons and hides the next button
const resetState = () => {
    nextButton.classList.add("hide");

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
        setTimeout(() => {
        nextButton.classList.add("hide");
        testerButton.classList.remove("hide");
        document.querySelector(".question").classList.add("hide");
        answerButtons.classList.add("hide");
        messageBox.classList.remove("hide");
        messageBox.innerText = `you have ${testerChances} chances to PRESS THE TESTER. Click the tester to begin`;
        showGameBoxes();
        }, 2000)

    }
    if (e.target.dataset.correct == "true") {
        questionText.innerText = "Correct Answer!";
        correctSound.play();
    } else {
        questionText.innerText = "Wrong Answer!";
        wrongSound.play();
    }
};

// remove hide class from game boxes
const showGameBoxes = () => {
    gameBoxes.forEach(box => {
        if (box.classList.contains("hide")) {
            box.classList.remove("hide")
        }
        box.innerText = box.dataset.text;
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
        question: "Which one you will see if you console.log(2+“2”) and console.log(2–“2”)",
        answers: [
            { text: "22 and 0", correct: true, chances: 3 },
            { text: "4 and 0", correct: false, chances: 1 },
            { text: "22 and NaN", correct: false, chances: 1 },
        ],
    },
    {
        question: "Which one you will see if you Console.log(5<6<7) and console.log(7>6>5)",
        answers: [
            { text: "true and true", correct: false, chances: 1 },
            { text: "true and false", correct: true, chances: 3 },
            { text: "false and false", correct: false, chances: 1 },
        ],
    },
    {
        question: "Which one you will see if you console.log(Math.max())",
        answers: [
            { text: "NaN", correct: false, chances: 1 },
            { text: "undefined", correct: false, chances: 1 },
            { text: "-infinity", correct: true, chances: 3 },
        ],
    },
    {
        question: "If you apply margin to an inline element which sides will it apply to?",
        answers: [
            { text: "only left and right", correct: true, chances: 3 },
            { text: "all sides", correct: false, chances: 1 },
            { text: "only top and bottom", correct: false, chances: 1 },
        ],
    },
    {
        question: "Which of these is true about {visibility:hidden} in CSS?",
        answers: [
            { text: "It is removed from layout flow", correct: false, chances: 1 },
            { text: "It occupies space", correct: true, chances: 3 },
            { text: "It is the same as {opacity:0}", correct: false, chances: 1 },
        ],
    },
    {
        question: "Which of these is true about the method splice?",
        answers: [
            { text: "Doesn’t modify the original array (immutable)", correct: false, chances: 1 },
            { text: "Used to pick elements from array", correct: false, chances: 1 },
            { text: "Used to insert or delete elements to/from array", correct: true, chances: 3 },
        ],
    },
    {
        question: "Which of these is false about null?",
        answers: [
            { text: "Converted to zero while performing primitive operations", correct: false, chances: 1 },
            { text: "Indicates the absence of a value for a variable", correct: false, chances: 1 },
            { text: "Indicates absence of variable itself", correct: true, chances: 3 },
        ],
    },
    {
        question: "HTML tags are used to describe document... ",
        answers: [
            { text: "Content", correct: true, chances: 3 },
            { text: "Definition", correct: false, chances: 1 },
            { text: "Language", correct: false, chances: 1 },
        ],
    },
    {
        question: "HTML document contain one root tag called... ",
        answers: [
            { text: "head", correct: false, chances: 1 },
            { text: "body", correct: false, chances: 1 },
            { text: "html", correct: true, chances: 3 },
        ],
    },
    {
        question: "If you want to use a dotted border around an image, which of css property are you going to use?",
        answers: [
            { text: "border-line", correct: false, chances: 1 },
            { text: "border-style", correct: true, chances: 3 },
            { text: "border-decoration", correct: false, chances: 1 },
        ],
    },
    {
        question: "If you want to wrap a block of text around an image, which css property will you use?",
        answers: [
            { text: "float", correct: true, chances: 3 },
            { text: "align", correct: false, chances: 1 },
            { text: "wrap", correct: false, chances: 1 },
        ],
    },
    {
        question: "The default value of “position” attribute is…",
        answers: [
            { text: "fixed", correct: false, chances: 1 },
            { text: "absolute", correct: false, chances: 1 },
            { text: "relative", correct: true, chances: 3 },
        ],
    },
    {
        question: "The 'function' and 'var' are known as:",
        answers: [
            { text: "keywords", correct: false, chances: 1 },
            { text: "declaration statements", correct: true, chances: 3 },
            { text: "data types", correct: false, chances: 1 },
        ],
    },
    {
        question: "Which method is used to add an element at the starting of an array",
        answers: [
            { text: "shift()", correct: false, chances: 1 },
            { text: "push()", correct: false, chances: 1 },
            { text: "unshift()", correct: true, chances: 3 },
        ],
    },
    {
        question: "In JavaScript the x===y statement implies that:",
        answers: [
            { text: "Both are equal in the value and data type.", correct: true, chances: 3 },
            { text: "Both x and y are equal in value, type and reference address as well.", correct: false, chances: 1 },
            { text: "Both are x and y are equal in value only.", correct: false, chances: 1 },
        ],
    },
];

startGame();

// start Tester Game phase Here
let boxId, boxValue, boxType
let intervalID = null

// apply the lit-border class to each box in a random index

function randomLightUpBox() {
    for (let i = 0; i < gameBoxes.length; i++) {
        gameBoxes[i].classList.remove("lit-border")
    }
    let randomBox = gameBoxes[Math.floor(Math.random() * 18)]
    randomBox.classList.add("lit-border")
    boxId = randomBox.id
}

// function for tester button to continuoulsy apply lit-border class to a box at a 300ms rate 
function startTester() {
    testerChances--
    chancesText.innerText = testerChances
    testerButton.classList.add("hide")
    stopTesterButton.classList.remove("hide")
    collectMoneyButton.classList.add("hide")
    messageBox.innerHTML = `testing code... <img src="imgs/coding1.gif" alt="coding">`
    intervalID = setInterval(randomLightUpBox, 300)
    testingSound.play()
}

// function to stop the tester from running and to apply conditions

function stopTester() {
    stopTesterButton.classList.add("hide")
    testerButton.classList.remove("hide")
    testingSound.pause()
    gameBoxes.forEach(box => {
        if (box.id == boxId) {
            boxValue = box.dataset.value
            boxType = box.dataset.type
            if (boxType === "money") {
                totalMoney += parseInt(boxValue)
                totalMoneyText.innerText = totalMoney
                messageBox.innerText = `your code looks good! you got paid $${boxValue} this round`
                collectMoneyButton.classList.remove("hide")
                moneySound.play()
                moneySound.volume = 0.5
            }
            else if (boxType === "bug") {
                bugCount += 1
                bugCountDisplay.innerText = bugCount
                totalMoney = 0
                totalMoneyText.innerText = totalMoney
                messageBox.innerHTML = `tester found a <i class="fas fa-bug bug"></i>3 bugs and you lose. Right now you have ${bugCount}`
                collectMoneyButton.classList.remove("hide")
                bugSound.play()
                bugSound.volume = 0.5
            }
            else if (boxType === "chance") {
                testerChances += 1
                chancesText.innerText = testerChances
                messageBox.innerText = `you got another chance to press the tester... now you have ${testerChances}`
                collectMoneyButton.classList.remove("hide")
                chanceSound.play()
                chanceSound.volume = 0.5
            }
        }
    })
    clearInterval(intervalID)
    gameOver()
}
// function to stop playing and collect money
function quitGame() {
    messageBox.innerText = `You want to quit, no problem, here's your paycheck of $${totalMoney}. Press Restart to go home`
    testerButton.classList.add("hide")
    restartButton.classList.remove("hide")
    collectMoneyButton.classList.add("hide")
    quitSound.play()
    quitSound.volume = 0.5
}

// gameOver function to display winning or loosing messages and restart the game
function gameOver() {
    setTimeout(() => {
        if (bugCount === 3) {
            collectMoneyButton.classList.add("hide")
            messageBox.innerText = "You got 3 bugs, you better keep coding, you lost this round!"
            testerButton.classList.add("hide")
            restartButton.classList.remove("hide")
            loseSound.play()

        } else if (testerChances === 0) {
            if (totalMoney === 0) {
                messageBox.innerText = `You're out of chances and unfortunately you lost all your Money. keep coding my friend!`
                loseSound.play()
            } else {
                messageBox.innerText = `you're out of chances, but good job on your code! You collected $${totalMoney}`
                winSound.play()
            }
            testerButton.classList.add("hide")
            restartButton.classList.remove("hide")
            collectMoneyButton.classList.add("hide")
        }
    }, 1000)
}

testerButton.addEventListener("click", startTester)

stopTesterButton.addEventListener("click", stopTester)

collectMoneyButton.addEventListener("click", quitGame)