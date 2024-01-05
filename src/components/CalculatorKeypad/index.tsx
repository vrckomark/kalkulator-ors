import { TbSquareRoot } from "react-icons/tb";
import Divide from "../../assets/icons/divide.svg";
import Multiply from "../../assets/icons/multiply.svg";
import Exponent from "./components/Exponent";
import History from "../ui/History";

const CalculatorKeypad = () => {
  return (
    <div className="flex w-full h-2/3 gap-6">
      <History />
      <div className="h-full w-full grid grid-cols-5 grid-rows-5 gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
        <button className="const-btn">
          <TbSquareRoot className="text-3xl" />
        </button>
        <button className="const-btn">
          <p className="text-secondary font-medium text-3xl">C</p>
        </button>
        <button className="const-btn">
          <p className=" font-medium text-3xl">( )</p>
        </button>
        <button className="const-btn">
          <p className=" font-medium text-3xl">%</p>
        </button>
        <button className="op-btn">
          <img src={Divide} alt="divide" draggable={false} />
        </button>
        <button className="const-btn">
          <Exponent base="x" exponent="y" />
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">7</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">8</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">9</p>
        </button>
        <button className="op-btn">
          <img src={Multiply} alt="multiply" draggable={false} />
        </button>
        <button className="const-btn">
          <Exponent base="x" exponent="2" />
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">4</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">5</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">6</p>
        </button>
        <button className="op-btn">
          <div className="w-[18px] h-1 rounded-full bg-white"></div>
        </button>
        <button className="const-btn">
          <p className=" font-medium text-3xl">π</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">1</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">2</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">3</p>
        </button>
        <button className="op-btn">
          <div className="relative">
            <div className="w-5 h-1 rounded-full bg-white"></div>
            <div className="w-5 h-1 rounded-full bg-white -translate-y-full rotate-90 "></div>
          </div>
        </button>
        <button className="const-btn">
          <p className=" font-medium text-3xl">e</p>
        </button>
        <button className="val-btn col-span-2">
          <p className=" font-medium text-3xl">0</p>
        </button>
        <button className="val-btn">
          <p className=" font-medium text-3xl">.</p>
        </button>
        <button className="op-btn">
          <p className=" font-medium text-3xl">=</p>
        </button>
      </div>
    </div>
  );
};

export default CalculatorKeypad;
