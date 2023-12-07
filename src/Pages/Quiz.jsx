/* eslint-disable */
import { Quiz } from "../ui-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions as QUESTIONS } from "../questions";

const QuizPage = () => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [disabled, setDisabled] = useState(false);
  const [showNext, setShowNext] = useState("hidden");

  const totalQuestions = QUESTIONS.length;

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const answers = currentQuestion.answers;

  const handleOptionClick = (index) => {
    setDisabled(true);
    setSelectedAnswer(index);
    setUserResponses((prevResponses) => [...prevResponses, index]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      // Navigate to the results page when all questions are answered
      navigate("/results", { state: { userResponses } });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setDisabled(false);
      setShowNext("hidden");
    }
  };

  useEffect(() => {
    console.log("User Responses:", userResponses);
    if (selectedAnswer !== undefined) {
      setShowNext("visible");
    }
  }, [selectedAnswer, userResponses]);

  const overrides = {
    Question: { children: currentQuestion.question },
    "Option 1": {
      isDisabled: disabled,
      children: answers[0],
      onClick: () => handleOptionClick(0),
    },
    "Option 2": {
      isDisabled: disabled,
      children: answers[1],
      onClick: () => handleOptionClick(1),
    },
    "Option 3": {
      isDisabled: disabled,
      children: answers[2],
      onClick: () => handleOptionClick(2),
    },
    "Option 4": {
      isDisabled: disabled,
      children: answers[3],
      onClick: () => handleOptionClick(3),
    },
    Button: {
      style: {
        cursor: "pointer",
        visibility: showNext,
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
