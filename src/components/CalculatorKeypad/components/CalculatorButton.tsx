import React from "react";
import { CalculatorButtonType } from "../consts/keypadButtons";

type CalculatorButtonProps = {
  disabled: boolean;
  onClick: (value: string) => void;
} & CalculatorButtonType;

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  element,
  style,
  value,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(value)}
      className={`${style} transition-all+ ${
        disabled ? "opacity-15 cursor-default hover:bg-opacity-20" : ""
      }`}
    >
      {element}
    </button>
  );
};

export default CalculatorButton;
