// Questions data
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
  const quizForm = document.getElementById('quizForm');
  questions.forEach((question, index) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    
    const questionTitle = document.createElement('p');
    questionTitle.textContent = question.question;
    
    questionContainer.appendChild(questionTitle);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.textContent = option;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = optionIndex;
      
      // Check if the user selected this option previously
      const savedProgress = sessionStorage.getItem('progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress[index] === optionIndex) {
          input.checked = true;
        }
      }

      label.prepend(input);
      questionContainer.appendChild(label);
    });

    quizForm.appendChild(questionContainer);
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
  const progress = JSON.parse(sessionStorage.getItem('progress'));
  if (!progress) return;

  let score = 0;
  progress.forEach((selectedOption, index) => {
    if (selectedOption === questions[index].correct) {
      score++;
    }
  });

  // Store the score in local storage
  localStorage.setItem('score', score);

  // Display the score
  document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
}

// Add event listeners
document.getElementById('submitBtn').addEventListener('click', () => {
  saveProgress();
  calculateScore();
});

// Load the quiz on page load
window.onload = loadQuiz;

