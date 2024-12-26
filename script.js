const questions = [
    { 
        question: "What is the capital of France?", 
        options: ["Berlin", "Madrid", "Paris", "Rome"], 
        correct: 2 
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        options: ["Earth", "Mars", "Jupiter", "Saturn"], 
        correct: 1 
    },
    { 
        question: "What is the largest ocean on Earth?", 
        options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
        correct: 3 
    },
    { 
        question: "Who wrote 'Romeo and Juliet'?", 
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], 
        correct: 0 
    },
    { 
        question: "What is the square root of 16?", 
        options: ["2", "4", "8", "16"], 
        correct: 1 
    }
];

// Retrieve user answers from sessionStorage or initialize to null
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || new Array(questions.length).fill(null);

const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');

// Function to display the quiz
function displayQuiz() {
    quizContainer.innerHTML = ''; // Clear previous quiz if any
    
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = question.question;
        
        questionDiv.appendChild(questionTitle);
        
        question.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optionIndex;
            input.id = `question-${index}-option-${optionIndex}`;
            
            // Preselect answers if they exist in sessionStorage
            if (userAnswers[index] === optionIndex) {
                input.checked = true;
            }
            
            // Save the answer to sessionStorage when changed
            input.addEventListener('change', () => {
                userAnswers[index] = optionIndex;
                sessionStorage.setItem('progress', JSON.stringify(userAnswers));
            });
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Function to calculate and display score
function calculateScore() {
    const score = userAnswers.reduce((score, answer, index) => {
        if (answer === questions[index].correct) {
            score++;
        }
        return score;
    }, 0);

    // Save score to localStorage
    localStorage.setItem('score', score);
    scoreElement.textContent = `Your score is ${score} out of 5.`;
}

// Check if the user has already submitted the quiz (score saved in localStorage)
if (localStorage.getItem('score')) {
    scoreElement.textContent = `Your last score was ${localStorage.getItem('score')} out of 5.`;
    submitBtn.disabled = true;  // Disable submit button if quiz is already completed
} else {
    displayQuiz(); // Display the quiz if not yet submitted
}

// Event listener for submit button
submitBtn.addEventListener('click', () => {
    calculateScore();
    submitBtn.disabled = true;  // Disable submit button after submission
});
