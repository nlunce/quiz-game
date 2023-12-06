import React from "react";
import { Options, APIKeyForm } from "../ui-components";
import OpenAI from "openai";
import { useNavigate, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const apiKey = "";
  s;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const navigate = useNavigate();
  function navigateHandler(page) {
    navigate(`/${page}`);
  }

  async function openaiclient() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Generate a JSON object with exaclty ten questions, each having four multiple-choice answers (options a, b, c, d), and indicate the correct answer for each question.",
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
  }

  async function generateQuestions() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Generate a JSON object with exaclty ten questions, each having four multiple-choice answers (options a, b, c, d), and indicate the correct answer for each question.",
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
  }

  const overrides = {
    Play: {
      onClick: () => {
        navigateHandler("quiz");
      },
    },
  };
  return (
    <>
      <APIKeyForm overrides={overrides} />
    </>
  );
};

export default HomePage;
