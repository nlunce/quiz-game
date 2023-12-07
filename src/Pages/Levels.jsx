import { GradeLevels } from "../ui-components";
import OpenAI from "openai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../questions";
const LevelsPage = () => {
  const apiKey = localStorage.getItem("apiKey");
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState("hidden");

  // useEffect(() => {
  //   // This effect runs whenever questions state changes
  //   if (questions.length > 0) {
  //     // Questions have been set, you can proceed with any logic here
  //     console.log(questions);
  //     setShowNext("visible");
  //   }
  // }, [questions]);

  const handleNext = () => {
    navigate("/quiz");
  };
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  async function getQuestion(gradeLevel, excludedQuestions = null) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a ${gradeLevel}-grade-level quiz question. 
          Return the question and nothing else, do not reply with anything but the question. 
          ${
            excludedQuestions
              ? "Do not use any of these questions or any variation of them: " +
                excludedQuestions.join(", ")
              : ""
          }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  }
  async function getFalseAnswer(question, excludedAnswers = null) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a false but possible answer this quiz question: ${question}. 
          Return the false but possible answer and nothing else, do not reply with anything but the false but possible answer. 
          ${
            excludedAnswers
              ? "Do not use any of these answers or any variation of them: " +
                excludedAnswers.join(", ")
              : ""
          }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const falseAnswer = completion.choices[0].message.content;
    return falseAnswer;
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
    const existingQuestions = [];
    const firstQuestion = await getQuestion(gradeLevel);
    const firstAnswers = [];
    const falseAnswer = await getFalseAnswer(firstQuestion);
    firstAnswers.push(falseAnswer);
    for (var h = 0; h < 2; h++) {
      const falseAnswer = await getFalseAnswer(firstQuestion, firstAnswers);
      firstAnswers.push(falseAnswer);
    }
    const firstCorrectAnswer = await getAnswer(firstQuestion);
    firstAnswers.push(firstCorrectAnswer);
    const firstQuestionObject = {
      question: firstQuestion,
      answers: firstAnswers,
      correct: 3,
    };
    questions.push(firstQuestionObject);
    for (var i = 0; i < 4; i++) {
      const question = await getQuestion(gradeLevel, existingQuestions);
      const answers = [];
      const falseAnswer = await getFalseAnswer(question);
      answers.push(falseAnswer);
      for (var j = 0; j < 2; j++) {
        const falseAnswer = await getFalseAnswer(question, answers);
        answers.push(falseAnswer);
      }
      const correctAnswer = await getAnswer(question);
      answers.push(correctAnswer);
      const questionObject = {
        question: question,
        answers: answers,
        correct: 3,
      };
      questions.push(questionObject);
    }
    console.log(questions);
    setShowNext("visible");
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
