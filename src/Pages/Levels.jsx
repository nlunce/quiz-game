import { GradeLevels } from "../ui-components";
import OpenAI from "openai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LevelsPage = () => {
  const apiKey = localStorage.getItem("apiKey");
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState("hidden");

  class Question {
    question;
    answers = [];
    correct = 3;

    constructor(apiKey, gradeLevel) {
      this.apiKey = apiKey;
      this.gradeLevel = gradeLevel;
      this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      this.getQuestion();
      this.getFalseAnswers();
      this.getAnswer();
    }

    async getQuestion() {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Create a ${this.gradeLevel}-grade-level quiz question. Return the question and nothing else, do not reply with anything but the question.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      this.question = completion.choices[0].message.content;
    }

    async getFalseAnswers(question) {
      for (var i = 0; i < 3; i++) {
        const completion = await this.openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Create a false but possible answer this quiz question: ${question}. Return the false but possible answer and nothing else, do not reply with anything but the false but possible answer.`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        const falseAnswser = completion.choices[0].message.content;
        this.answers.push(falseAnswser);
      }
    }
    async getAnswer(question) {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Create an answer this quiz question: ${question}. Return the answer and nothing else, do not reply with anything but the answer.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const answser = completion.choices[0].message.content;
      this.answers.push(answser);
    }
  }

  class Questions {
    questions = [];
  }

  const handleNext = () => {
    navigate("/quiz");
  };

  const handleOptionClick = () => {
    setShowNext("visible");
  };

  const overrides = {
    "First Grade": { onClick: () => handleOptionClick() },
    "Second Grade": { onClick: () => handleOptionClick() },
    "Third Grade": { onClick: () => handleOptionClick() },
    "Fourth Grade": { onClick: () => handleOptionClick() },
    "Fifth Grade": { onClick: () => handleOptionClick() },
    "Sixth Grade": { onClick: () => handleOptionClick() },
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
