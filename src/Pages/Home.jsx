import React, { useState, useEffect } from "react";
import { APIKeyForm } from "../ui-components";
import OpenAI from "openai";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [submit, setSubmit] = useState();
  // const [isSubmitting, setIsSubmitting] = useState();
  const [play, setPlay] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [invalid, setInvalid] = useState("hidden");
  const [apiKeyPlaceholder, setApiKeyPlaceholder] = useState("Enter API key");

  const navigate = useNavigate();

  function navigateHandler(page) {
    navigate(`/${page}`);
  }

  useEffect(() => {
    const lsApiKey = localStorage.getItem("apiKey");
    if (lsApiKey !== null) {
      setPlay(false);
      setSubmit(true);
      setApiKey(lsApiKey);
      setApiKeyPlaceholder(lsApiKey);
    }
  }, []);

  useEffect(() => {
    const checkApiKey = async () => {
      const isValid = await testApiKey(apiKey);
      if (isValid) {
        localStorage.setItem("apiKey", apiKey);
        setInvalid("hidden");
        setSubmit(true);
        setPlay(false);
      } else {
        setInvalid("visible");
      }
    };

    if (apiKey) {
      checkApiKey();
    }
  }, [apiKey]);

  async function testApiKey(apiKey) {
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: "Are you there?",
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);
      return true;
    } catch (error) {
      console.error("API Key test failed:", error);
      return false;
    }
  }

  const overrides = {
    TextField: {
      isDisabled: submit,
      id: "apiKeyInput",
      placeholder: apiKeyPlaceholder,
    },
    label: {
      style: {
        visibility: invalid,
      },
    },
    Play: {
      isDisabled: play,
      onClick: () => {
        navigateHandler("levels");
      },
    },
    Submit: {
      isDisabled: submit,
      onClick: () => {
        const apiKeyValue = document.getElementById("apiKeyInput").value;
        setApiKey(apiKeyValue);
      },
    },
    Download: {
      onClick: () => {
        window.open("https://github.com/jadabower/TriviaGame");
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
