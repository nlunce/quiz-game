import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions as QUESTIONS } from "../questions";
import { Results } from "../ui-components";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userResponses } = location.state;

  // Calculate the user's score
  const calculateScore = () => {
    let score = 0;

    userResponses.forEach((response, index) => {
      const correctAnswerIndex = QUESTIONS[index].correct; // Adjust for array indexing (correct is 1-based)

      if (response === correctAnswerIndex) {
        score++;
      }
    });

    return score;
  };

  const userScore = `${calculateScore()}/${QUESTIONS.length}`;

  const overrides = {
    Score: { children: userScore },
    Button: {
      onClick: () => {
        QUESTIONS.length = 0;
        navigate("/");
      },
    },
  };
  //
  return (
    <>
      <Results overrides={overrides} />
    </>
  );
};

export default ResultsPage;
