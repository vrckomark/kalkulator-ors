import { useContext, useEffect, useState } from "react";
import { modeContext } from "../../../contexts/ModeContext";
import {
  CalculatorButtonType,
  numericButtons,
  systemicButtons,
} from "../consts/keypadButtons";
import { useResultScreen } from "../../ResultScreen/hooks/useResultScreen";

export const useCalculatorKeypad = () => {
  const [keypadStyle, setKeypadStyle] = useState("grid-cols-5");
  const [buttons, setButtons] =
    useState<CalculatorButtonType[]>(numericButtons);

  const { mode } = useContext(modeContext);
  const { addToExpression } = useResultScreen();

  const onButtonClick = (value: string) => {
    addToExpression(value);
  };

  useEffect(() => {
    const colStyle = {
      numeric: "grid-cols-5",
      systemic: "grid-cols-6",
    }[mode];
    setKeypadStyle(`opacity-0`);
    setTimeout(() => {
      setButtons(
        {
          numeric: numericButtons,
          systemic: systemicButtons,
        }[mode]
      );
      setKeypadStyle(`${colStyle} opacity-0`);
    }, 50);
    setTimeout(() => setKeypadStyle(`${colStyle} opacity-100`), 150);
  }, [mode]);

  return {
    mode,
    buttons,
    keypadStyle,
    onButtonClick,
  };
};
