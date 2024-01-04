import React from "react";
import History from "../History";
import Root from "../../assets/icons/root.svg";
import Divide from "../../assets/icons/divide.svg";
import Multiply from "../../assets/icons/multiply.svg";
import Exponent from "./components/Exponent";

const CalculatorKeypad = () => {
  return (
    <div className="flex w-full flex-1 gap-6">
      <History />
      <div className="h-full w-full grid grid-cols-5 grid-rows-5 gap-6">
        <button className="calc-button bg-opacity-10">
          <img src={Root} alt="square-root" />
        </button>
        <button className="calc-button bg-opacity-10">
          <p className="text-secondary font-medium text-3xl">C</p>
        </button>
        <button className="calc-button bg-opacity-10">
          <p className=" font-medium text-3xl">( )</p>
        </button>
        <button className="calc-button bg-opacity-10">
          <p className=" font-medium text-3xl">%</p>
        </button>
        <button className="calc-button bg-opacity-70 bg-primary">
          <img src={Divide} alt="divide" />
        </button>
        <button className="calc-button bg-opacity-10">
          <Exponent base="x" exponent="y" />
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">7</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">8</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">9</p>
        </button>
        <button className="calc-button bg-primary bg-opacity-70">
          <img src={Multiply} alt="multiply" />
        </button>
        <button className="calc-button bg-opacity-10">
          <Exponent base="x" exponent="2" />
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">4</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">5</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">6</p>
        </button>
        <button className="calc-button bg-primary bg-opacity-70">
          <div className="w-[18px] h-1 rounded-full bg-white"></div>
        </button>
        <button className="calc-button bg-opacity-10">
          <p className=" font-medium text-3xl">π</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">1</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">2</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">3</p>
        </button>
        <button className="calc-button bg-primary bg-opacity-70">
          <div className="relative">
            <div className="w-5 h-1 rounded-full bg-white"></div>
            <div className="w-5 h-1 rounded-full bg-white -translate-y-full rotate-90 "></div>
          </div>
        </button>
        <button className="calc-button bg-opacity-10">
          <p className=" font-medium text-3xl">e</p>
        </button>
        <button className="calc-button col-span-2">
          <p className=" font-medium text-3xl">0</p>
        </button>
        <button className="calc-button">
          <p className=" font-medium text-3xl">.</p>
        </button>
        <button className="calc-button bg-primary bg-opacity-100">
          <p className=" font-medium text-3xl">=</p>
        </button>
      </div>
    </div>
  );
};

export default CalculatorKeypad;
