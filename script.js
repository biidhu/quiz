document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initial-screen');
    const quizContainer = document.getElementById('quiz-container');
    const summaryContainer = document.getElementById('summary-container');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('score-display');
    const timerDisplay = document.getElementById('timer-display');
    const summaryText = document.getElementById('summary-text');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;

    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Tool Markup Language"
            ],
            answer: 0
        },
        {
            question: "Which property is used to change the background color of an element in CSS?",
            options: [
                "background-color",
                "color",
                "bg-color",
                "background"
            ],
            answer: 0
        },
        {
            question: "How do you select an element with the id 'header' in CSS?",
            options: [
                "#header",
                ".header",
                "header",
                "*header"
            ],
            answer: 0
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "color",
                "font-color",
                "text-color",
                "text-style"
            ],
            answer: 0
        },
       
        {
            question: "How do you write 'Hello World' in an alert box in JavaScript?",
            options: [
                "alert('Hello World');",
                "msg('Hello World');",
                "alertBox('Hello World');",
                "msgBox('Hello World');"
            ],
            answer: 0
        },
        {
            question: "Which event occurs when the user clicks on an HTML element?",
            options: [
                "onmouseover",
                "onchange",
                "onclick",
                "onmouseclick"
            ],
            answer: 2
        },
        {
            question: "How do you declare a JavaScript variable?",
            options: [
                "var carName;",
                "variable carName;",
                "v carName;",
                "carName;"
            ],
            answer: 0
        },
        {
            question: "Which operator is used to assign a value to a variable in JavaScript?",
            options: [
                "=",
                "==",
                "===",
                "<="
            ],
            answer: 0
        }
    ];
    
    startQuizBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', submitAnswer);
    restartQuizBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        initialScreen.classList.add('hidden');
        summaryContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
            optionsContainer.appendChild(optionLabel);
        });
    }

    function submitAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert("Please select an answer!");
            return;
        }

        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitAnswer();
            } else {
                timeLeft--;
                timerDisplay.textContent = `Time: ${timeLeft}`;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 30;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        startTimer();
    }

    function endQuiz() {
        clearInterval(timer);
        quizContainer.classList.add('hidden');
        summaryContainer.classList.remove('hidden');
        summaryText.textContent = `You scored ${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        startQuiz();
    }
});
