"use strict";

// Quiz Data start
const quizData = [
  {
    img: `/assets/js.png`,
    question: "When was JavaScript created?",
    a: "1995",
    b: "2002",
    c: "1998",
    d: "1992",
    correct: "a",
  },
  {
    img: `/assets/css.png`,
    question: "What should I use to place items next to each other?",
    a: "Margin",
    b: "Padding",
    c: "Grid",
    d: "FlexBox",
    correct: "d",
  },
  {
    img: `/assets/fire.png`,
    question: "What is the most popular programming language in 2022?",
    a: "JavaScript",
    b: "C++",
    c: "Python",
    d: "Java",
    correct: "c",
  },
];
// Quiz Data end

const app = () => {
  // Get elements from HTML start
  const image = document.querySelector(".form-img");
  const question = document.querySelector(".question");
  const answerA = document.getElementById("a-btn");
  const answerB = document.getElementById("b-btn");
  const answerC = document.getElementById("c-btn");
  const answerD = document.getElementById("d-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const answers = document.querySelectorAll(".answer");
  const error = document.querySelector(".error");
  const wrongAnswer = document.querySelector(".wrong-answer");

  let currentQuiz = 0;
  let selectedAnswer = null;

  // Update Quiz with correct data
  const loadQuiz = () => {
    image.src = quizData[currentQuiz].img;
    question.innerText = quizData[currentQuiz].question;
    answerA.textContent = quizData[currentQuiz].a;
    answerB.textContent = quizData[currentQuiz].b;
    answerC.textContent = quizData[currentQuiz].c;
    answerD.textContent = quizData[currentQuiz].d;
  };

  // Add click event listeners to each answer
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      // Remove active class from each answer
      answers.forEach((answer) => {
        if (answer.classList.contains("active"))
          answer.classList.remove("active");
      });
      // Add active class to clicked answer
      answer.classList.add("active");
      // Set selectedAnswer as clicked answer
      selectedAnswer = answer;

      // Remove error messages
      if (error.classList.contains("error-active")) {
        error.classList.remove("error-active");
      } else if (wrongAnswer.classList.contains("error-active")) {
        wrongAnswer.classList.remove("error-active");
      }
    });
  });

  // Handle button click
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Show error message if no answer is chosen
    if (!selectedAnswer) {
      error.classList.add("error-active");
    }

    // Add wrong answer message if wrong answer is selected
    if (
      selectedAnswer &&
      selectedAnswer.dataset.answer !== quizData[currentQuiz].correct
    ) {
      wrongAnswer.classList.add("error-active");
    }

    // Move on to next question if question is answered correctly
    if (
      selectedAnswer &&
      selectedAnswer.dataset.answer === quizData[currentQuiz].correct
    ) {
      // Check if there's a next question to move on to
      if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
      } else {
        currentQuiz = 0;
      }
      selectedAnswer.classList.remove("active");
      selectedAnswer = null;
      loadQuiz();
    }
  });

  // Start quiz
  loadQuiz();
};
app();
