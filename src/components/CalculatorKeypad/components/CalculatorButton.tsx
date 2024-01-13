import React from "react";
import { CalculatorButtonType } from "../consts/keypadButtons";

type CalculatorButtonProps = {
  onClick: (value: string) => void;
} & CalculatorButtonType;

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  element,
  style,
  value,
  onClick,
}) => {
  return (
    <button onClick={() => onClick(value)} className={style}>
      {element}
    </button>
  );
};

export default CalculatorButton;
