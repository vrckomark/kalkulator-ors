import { useContext } from "react";
import { modeContext } from "../../contexts/ModeContext";
import { SYSTEMS, systemValues } from "../../consts/symbols";
import { useResultScreen } from "./hooks/useResultScreen";
import { convert } from "./utils/operators";

const ResultScreen = () => {
  const { expression, mode, selectedSystem: system } = useContext(modeContext);

  const { evaluatedExpression } = useResultScreen();

  return (
    <div className="w-full relative flex justify-center  items-end flex-col h-full pr-4">
      {mode === "systemic" && (
        <div className="absolute left-[20%] flex gap-6 jusitfy-between">
          <div className="flex flex-col">
            <p className="text-2xl">BIN</p>
            <p className="text-2xl">OCT</p>
            <p className="text-2xl">DEC</p>
            <p className="text-2xl">HEX</p>
          </div>
          <div className="flex flex-end flex-col text-left">
            <p className="text-2xl">
              {convert(expression[mode], system, SYSTEMS.BIN) || 0}
            </p>
            <p className="text-2xl">
              {convert(expression[mode], system, SYSTEMS.OCT) || 0}
            </p>
            <p className="text-2xl">
              {convert(expression[mode], system, SYSTEMS.DEC) || 0}
            </p>
            <p className="text-2xl">
              {convert(expression[mode], system, SYSTEMS.HEX) || 0}
            </p>
          </div>
        </div>
      )}
      <p
        autoFocus
        className="text-[44px] font-medium bg-transparent text-right outline-none w-full"
      >
        {expression[mode] || "0"}
      </p>

      <p className="text-3xl opacity-50 font-medium h-9">
        {isNaN(parseFloat(evaluatedExpression || ""))
          ? ""
          : evaluatedExpression}
      </p>
      <p className="absolute right-0 bottom-0 text-2xl font-medium p-4 tracking-wider">
        {mode === "systemic" && `${system} (${systemValues[system]})`}
      </p>
    </div>
  );
};

export default ResultScreen;
