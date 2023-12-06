import { GradeLevels } from "../ui-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LevelsPage = () => {
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState("hidden");

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
