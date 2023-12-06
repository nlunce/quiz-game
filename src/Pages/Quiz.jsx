import { Quiz } from "../ui-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QUESTIONS from "../Questions/questions.js";

const QuizPage = () => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextQuestion, setShowNextQuestion] = useState("hidden");

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const answers = currentQuestion.answers;

  const handleOptionClick = (index) => {
    setSelectedAnswer(index);
    setShowNextQuestion("visible");
  };

  const handleNextQuestion = () => {
    // Store the user's response for the current question
    setUserResponses([...userResponses, selectedAnswer]);

    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowNextQuestion("hidden");
    } else {
      // Navigate to the results page with the userResponses
      navigate("/results", { state: { userResponses } });
    }
  };

  const overrides = {
    Question: { children: currentQuestion.question },
    "Option 1": {
      children: answers[0],
      onClick: () => handleOptionClick(1),
    },
    "Option 2": {
      children: answers[1],
      onClick: () => handleOptionClick(2),
    },
    "Option 3": {
      children: answers[2],
      onClick: () => handleOptionClick(3),
    },
    "Option 4": {
      children: answers[3],
      onClick: () => handleOptionClick(4),
    },
    Button: {
      style: {
        cursor: "pointer",
        visibility: showNextQuestion,
      },
      onClick: handleNextQuestion,
    },
  };

  return (
    <div>
      <Quiz overrides={overrides} />
    </div>
  );
};

export default QuizPage;
