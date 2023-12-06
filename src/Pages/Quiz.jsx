import { Quiz } from "../ui-components";
import { useState } from "react";

const QuizPage = () => {
  const [question, setQuestion] = useState();
  // const [question, setQuestion] = useState();

  const overrides = { Question: { children: question } };

  return <Quiz overrides={overrides} />;
};

export default QuizPage;
