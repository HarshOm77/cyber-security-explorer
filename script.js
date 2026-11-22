
/* Password Strength Checker */

const passwordInput = document.getElementById("passwordInput");
const passwordResult = document.getElementById("passwordResult");
const checkPasswordBtn = document.getElementById("checkPasswordBtn");

checkPasswordBtn.addEventListener("click", checkPassword);

function checkPassword() {

    const password = passwordInput.value;

    if (password.length === 0) {
        passwordResult.textContent =

            "Please enter an example password.";
        return;
    }

    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let strength;

    if (score <= 2) {
        strength = "Weak ⚠️";
    } else if (score <= 3) {
        strength = "Medium 🟡";
    } else {
        strength = "Strong 🟢";

    }

    passwordResult.innerHTML =
        "Password Strength: " + strength +
        "<br>Score: " + score + "/5";
}


/* Cyber Security Quiz */

const questions = [

    {
        question: "What does HTTPS help provide?",
        options: [
            "Encrypted connection",
            "Free internet",
            "More storage",
            "Faster charging"
        ],
        answer: 0

    },

    {
        question: "Which password is generally stronger?",
        options: [
            "123456",
            "password",
            "A long unique password",
            "Your name"
        ],
        answer: 2
    },

    {
        question: "What is phishing?",
        options: [
            "A computer game",
            "A trick to steal information",
            "A type of keyboard",
            "A search engine"
        ],

        answer: 1
    },

    {
        question: "What does 2FA mean?",
        options: [
            "Two-Factor Authentication",
            "Two Free Accounts",
            "Fast File Access",
            "Two File Applications"
        ],
        answer: 0
    },

    {
        question: "What should you do with a suspicious link?",
        options: [
            "Open it immediately",
            "Share it",
            "Avoid clicking it",
            "Send your password"

        ],
        answer: 2
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const quizResult = document.getElementById("quizResult");
const nextButton = document.getElementById("nextButton");

/* Display Questions */

function loadQuestion() {

    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionText.textContent = current.question;

    quizResult.textContent = "";

    optionsContainer.innerHTML = "";

    answered = false;

    nextButton.textContent =
        currentQuestion === questions.length 

- 1
        ? "See Results"
        : "Next Question →";

    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", function() {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);

    });

}


/* Check Answers */

function checkAnswer(selectedAnswer) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const optionButtons =
        document.querySelectorAll(".quiz-option");

    if (selectedAnswer === correctAnswer) {

        score++;

        quizResult.textContent =
            "Correct! Great job! 🎉";

    } else {

        quizResult.textContent =
            "Not quite! Correct answer: " +
            questions[currentQuestion].options[correctAnswer];

    }

    optionButtons.forEach(button => {
        button.disabled = true;
    });

}


/* Next Question */

function nextQuestion() {

    if (!answered) {

        quizResult.textContent =
            "Please select an answer first!";

        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResults();

    }

}



/* Final Quiz Results */

function showResults() {

    questionNumber.textContent = "Quiz Completed!";

    questionText.textContent =
        "Your final score is " +
        score + " / " + questions.length;

    optionsContainer.innerHTML = "";

    quizResult.textContent =
        score === 5
        ? "Excellent! You are a Cyber Safety Champion! 🏆"
        : "Great effort! Keep learning about cyber safety.";

    nextButton.textContent = "Play Again";

    nextButton.onclick = restartQuiz;

}


/* Restart Quiz */

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    nextButton.onclick = nextQuestion;

    loadQuestion();

}


/* Start the Quiz */


nextButton.addEventListener("click", nextQuestion);

loadQuestion();
