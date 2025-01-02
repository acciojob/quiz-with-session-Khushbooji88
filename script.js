const questions = [
  { 
    question: "What is 2 + 2?", 
    options: ["3", "4", "5", "6"], 
    correct: 1
  },
  { 
    question: "What is the capital of France?", 
    options: ["Berlin", "Madrid", "Paris", "Rome"], 
    correct: 2
  },
  { 
    question: "Which planet is known as the Red Planet?", 
    options: ["Earth", "Mars", "Jupiter", "Venus"], 
    correct: 1
  },
  { 
    question: "Who wrote 'Romeo and Juliet'?", 
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], 
    correct: 0
  },
  { 
    question: "What is the largest ocean on Earth?", 
    options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
    correct: 3
  }
];

// Function to load the quiz questions
function loadQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = '';

  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.textContent = option;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = optionIndex;

      const savedProgress = sessionStorage.getItem('progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress[index] === optionIndex) {
          input.checked = true;
        }
      }

      label.prepend(input);
      questionDiv.appendChild(label);
    });

    quizContainer.appendChild(questionDiv);
  });
}

// Function to save the quiz progress in session storage
function saveProgress() {
  const progress = [];
  questions.forEach((_, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    progress.push(selectedOption ? parseInt(selectedOption.value) : null);
  });

  sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Function to calculate and display the score
function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem('progress')) || [];

  let score = 0;
  progress.forEach((selectedOption, index) => {
    if (selectedOption === questions[index].correct) {
      score++;
    }
  });

  // Store the score in local storage
  localStorage.setItem('score', score);

  // Display the score
  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.textContent = `Your score is ${score} out of 5.`;
}

// Event listener for saving progress on option change
document.addEventListener('change', saveProgress);

// Event listener for the submit button
document.getElementById('submitBtn').addEventListener('click', calculateScore);

// Load the quiz on page load
window.onload = loadQuiz;
