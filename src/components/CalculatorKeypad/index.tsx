import History from "../ui/History";
import CalculatorButton from "./components/CalculatorButton";
import { useCalculatorKeypad } from "./hooks/useCalculatorKeypad";

const CalculatorKeypad = () => {
  const { buttons, keypadStyle, onButtonClick } = useCalculatorKeypad();

  return (
    <div className="flex w-full h-2/3 gap-6">
      <History />
      <div
        className={`h-full w-full  grid grid-rows-5 gap-2 sm:gap-4 lg:gap-6 xl:gap-8 ${keypadStyle}`}
      >
        {buttons.map((button, index) => (
          <CalculatorButton key={index} {...button} onClick={onButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default CalculatorKeypad;
