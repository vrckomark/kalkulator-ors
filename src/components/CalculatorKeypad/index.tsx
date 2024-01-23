import { useContext } from "react";
import { modeContext } from "../../contexts/ModeContext";
import History from "../ui/History";
import CalculatorButton from "./components/CalculatorButton";
import { useCalculatorKeypad } from "./hooks/useCalculatorKeypad";
import { scientificButtons } from "./consts/keypadButtons";

const CalculatorKeypad = () => {
  const { buttons, keypadStyle, onButtonClick } = useCalculatorKeypad();
  const { selectedSystem: system, mode } = useContext(modeContext);

  return (
    <div className="flex w-full h-2/3 gap-6">
      <History />
      <div
        className={`h-full w-full  grid grid-rows-5 gap-1 sm:gap-2 lg:gap-4 xl:gap-4 ${keypadStyle}`}
      >
        {buttons.map((button, index) => (
          <CalculatorButton
            disabled={
              button.style === "val-btn" &&
              !scientificButtons[system].includes(button.value) &&
              mode === "systemic"
            }
            key={index}
            {...button}
            onClick={onButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalculatorKeypad;
