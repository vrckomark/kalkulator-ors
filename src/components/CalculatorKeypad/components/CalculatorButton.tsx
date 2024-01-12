import React from "react";
import { CalculatorButtonType } from "../consts/keypadButtons";

const CalculatorButton: React.FC<CalculatorButtonType> = ({ value, style }) => {
  return <button className={style}>{value}</button>;
};

export default CalculatorButton;
