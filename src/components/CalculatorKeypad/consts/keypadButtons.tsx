import { TbSquareRoot } from "react-icons/tb";
import Divide from "../../../assets/icons/divide.svg";
import Multiply from "../../../assets/icons/multiply.svg";
import Exponent from "../components/Exponent";

export type ButtonStyle = "const-btn" | "val-btn" | "op-btn";
export type ButtonValue = JSX.Element | string;
export type CalculatorButtonType = {
  style: ButtonStyle;
  value: ButtonValue;
};

export const numericButtons = [
  {
    style: "const-btn",
    value: <TbSquareRoot className="text-3xl" />,
  },
  {
    style: "const-btn",
    value: <p className="text-secondary font-medium text-3xl">C</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">( )</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">%</p>,
  },
  {
    style: "op-btn",
    value: <img src={Divide} alt="divide" draggable={false} />,
  },
  {
    style: "const-btn",
    value: <Exponent base="x" exponent="y" />,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">7</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">8</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">9</p>,
  },
  {
    style: "op-btn",
    value: <img src={Multiply} alt="multiply" draggable={false} />,
  },
  {
    style: "const-btn",
    value: <Exponent base="x" exponent="2" />,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">4</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">5</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">6</p>,
  },
  {
    style: "op-btn",
    value: <div className="w-[18px] h-1 rounded-full bg-white"></div>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">π</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">1</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">2</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">3</p>,
  },
  {
    style: "op-btn",
    value: (
      <div className="relative">
        <div className="w-5 h-1 rounded-full bg-white"></div>
        <div className="w-5 h-1 rounded-full bg-white -translate-y-full rotate-90 "></div>
      </div>
    ),
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">e</p>,
  },
  {
    style: "val-btn col-span-2",
    value: <p className=" font-medium text-3xl">0</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">.</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">=</p>,
  },
] as CalculatorButtonType[];

export const systemicButtons = [
  {
    style: "const-btn",
    value: <p className="text-secondary font-medium text-3xl">C</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">F</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">( )</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">xor</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">nor</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">nand</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">BIN</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">E</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">7</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">8</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">9</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">not</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">OCT</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">D</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">4</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">5</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">6</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">and</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">DEC</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">C</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">1</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">2</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">3</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">or</p>,
  },
  {
    style: "const-btn",
    value: <p className=" font-medium text-3xl">HEX</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">B</p>,
  },
  {
    style: "val-btn",
    value: <p className=" font-medium text-3xl">A</p>,
  },
  {
    style: "val-btn col-span-2",
    value: <p className=" font-medium text-3xl">0</p>,
  },
  {
    style: "op-btn",
    value: <p className=" font-medium text-3xl">=</p>,
  },
] as CalculatorButtonType[];
