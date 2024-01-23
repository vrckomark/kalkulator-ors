import History from "../ui/History";
import CalculatorButton from "./components/CalculatorButton";
import { useCalculatorKeypad } from "./hooks/useCalculatorKeypad";

const CalculatorKeypad = () => {
  const { buttons, keypadStyle, onButtonClick } = useCalculatorKeypad();

  return (
    <div className="flex w-full h-2/3 gap-6">
      <History />
      <div
        className={`h-full w-full  grid grid-rows-5 gap-1 sm:gap-2 lg:gap-4 xl:gap-4 ${keypadStyle}`}
      >
        {buttons.map((button, index) => (
          <CalculatorButton key={index} {...button} onClick={onButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default CalculatorKeypad;
