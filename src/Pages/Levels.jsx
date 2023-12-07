import { GradeLevels } from "../ui-components";
import OpenAI from "openai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useQuestionsState } from "../Questions/questionsState";

const LevelsPage = () => {
  const apiKey = localStorage.getItem("apiKey");
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState("hidden");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // This effect runs whenever questions state changes
    if (questions.length > 0) {
      // Questions have been set, you can proceed with any logic here
      console.log(questions);
      setShowNext("visible");
    }
  }, [questions]);

  const handleNext = () => {
    navigate("/quiz", { state: { questions } });
  };

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  async function getQuestion(gradeLevel) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a ${gradeLevel}-grade-level quiz question. Return the question and nothing else, do not reply with anything but the question.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  }

  async function getFalseAnswer(question) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a false but possible answer this quiz question: ${question}. Return the false but possible answer and nothing else, do not reply with anything but the false but possible answer.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const falseAnswser = completion.choices[0].message.content;
    return falseAnswser;
  }

  async function getAnswer(question) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create an answer this quiz question: ${question}. Return the answer and nothing else, do not reply with anything but the answer.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const answer = completion.choices[0].message.content;
    return answer;
  }

  async function handleOptionClick(gradeLevel) {
    const newQuestions = [];

    for (var i = 0; i < 5; i++) {
      const question = await getQuestion(gradeLevel);
      const answers = [];

      for (var j = 0; j < 3; j++) {
        const falseAnswer = await getFalseAnswer(question);
        answers.push(falseAnswer);
      }

      const correctAnswer = await getAnswer(question);
      answers.push(correctAnswer);

      const questionObject = {
        question: question,
        answers: answers,
        correct: 3,
      };
      newQuestions.push(questionObject);
    }

    setQuestions(newQuestions);
  }

  const overrides = {
    "First Grade": { onClick: () => handleOptionClick("first") },
    "Second Grade": { onClick: () => handleOptionClick("second") },
    "Third Grade": { onClick: () => handleOptionClick("third") },
    "Fourth Grade": { onClick: () => handleOptionClick("fourth") },
    "Fifth Grade": { onClick: () => handleOptionClick("fifth") },
    "Sixth Grade": { onClick: () => handleOptionClick("sixth") },
    Button: {
      style: {
        cursor: "pointer",
        visibility: showNext,
      },
      onClick: handleNext,
    },
  };

  return <GradeLevels overrides={overrides} />;
};

export default LevelsPage;
