import { TbSquareRoot } from "react-icons/tb";
import Divide from "../../../assets/icons/divide.svg";
import Multiply from "../../../assets/icons/multiply.svg";
import Exponent from "../components/Exponent";

export type ButtonStyle = "const-btn" | "val-btn" | "op-btn";
export type ButtonValue = JSX.Element | string;
export type CalculatorButtonType = {
  style: ButtonStyle;
  element: ButtonValue;
  value: string;
};

export const numericButtons = [
  {
    style: "const-btn",
    element: <TbSquareRoot className="text-3xl" />,
    value: "sqrt()",
  },
  {
    style: "const-btn",
    element: <p className="text-secondary font-medium text-3xl">C</p>,
    value: "CLR",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">( )</p>,
    value: "()",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">%</p>,
    value: "%",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">/</p>,
    value: "/",
  },
  {
    style: "const-btn",
    element: <Exponent base="x" exponent="y" />,
    value: "pow(x,y)",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">7</p>,
    value: "7",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">8</p>,
    value: "8",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">9</p>,
    value: "9",
  },
  {
    style: "op-btn",
    element: <img src={Multiply} alt="multiply" draggable={false} />,
    value: "*",
  },
  {
    style: "const-btn",
    element: <Exponent base="x" exponent="2" />,
    value: "pow(x,2)",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">4</p>,
    value: "4",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">5</p>,
    value: "5",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">6</p>,
    value: "6",
  },
  {
    style: "op-btn",
    element: <div className="w-[18px] h-1 rounded-full bg-white"></div>,
    value: "-",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">π</p>,
    value: "π",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">1</p>,
    value: "1",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">2</p>,
    value: "2",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">3</p>,
    value: "3",
  },
  {
    style: "op-btn",
    element: (
      <div className="relative">
        <div className="w-5 h-1 rounded-full bg-white"></div>
        <div className="w-5 h-1 rounded-full bg-white -translate-y-full rotate-90 "></div>
      </div>
    ),
    value: "+",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">e</p>,
    value: "e",
  },
  {
    style: "val-btn col-span-2",
    element: <p className=" font-medium text-3xl">0</p>,
    value: "0",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">.</p>,
    value: ".",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">=</p>,
    value: "=",
  },
] as CalculatorButtonType[];

export const systemicButtons = [
  {
    style: "const-btn",
    element: <p className="text-secondary font-medium text-3xl">C</p>,
    value: "CLR",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">F</p>,
    value: "F",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">( )</p>,
    value: "()",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">xor</p>,
    value: "xor",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">nor</p>,
    value: "nor",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">nand</p>,
    value: "nand",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">BIN</p>,
    value: "BIN",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">E</p>,
    value: "E",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">7</p>,
    value: "7",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">8</p>,
    value: "8",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">9</p>,
    value: "9",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">not</p>,
    value: "not",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">OCT</p>,
    value: "OCT",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">D</p>,
    value: "D",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">4</p>,
    value: "4",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">5</p>,
    value: "5",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">6</p>,
    value: "6",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">and</p>,
    value: "and",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">DEC</p>,
    value: "DEC",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">C</p>,
    value: "C",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">1</p>,
    value: "1",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">2</p>,
    value: "2",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">3</p>,
    value: "3",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">or</p>,
    value: "or",
  },
  {
    style: "const-btn",
    element: <p className=" font-medium text-3xl">HEX</p>,
    value: "HEX",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">B</p>,
    value: "B",
  },
  {
    style: "val-btn",
    element: <p className=" font-medium text-3xl">A</p>,
    value: "A",
  },
  {
    style: "val-btn col-span-2",
    element: <p className=" font-medium text-3xl">0</p>,
    value: "0",
  },
  {
    style: "op-btn",
    element: <p className=" font-medium text-3xl">=</p>,
    value: "=",
  },
] as CalculatorButtonType[];
