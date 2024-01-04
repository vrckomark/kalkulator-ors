import { useContext } from "react";
import { modeContext, modes } from "../contexts/ModeContext";

const ModeSelector = () => {
  const { mode, selectMode } = useContext(modeContext);

  return (
    <div className="flex gap-2 z-0 relative rounded-2xl bg-white bg-opacity-10 p-2">
      <div
        className={`bg-primary transition-all z-10 w-10 h-10 left-2  rounded-xl absolute top-2 ${
          mode === modes.SYSTEMIC ? "translate-x-[calc(100%+8px)]" : ""
        }`}
      />
      <div
        onClick={() => selectMode(modes.NUMERIC)}
        className="w-10 z-20 h-10 flex cursor-pointer justify-center items-center rounded-xl"
      >
        <p className="font-bold select-none">123 </p>
      </div>
      <div
        onClick={() => selectMode(modes.SYSTEMIC)}
        className="w-10 z-20 h-10 cursor-pointer flex justify-center items-center rounded-xl"
      >
        <p className="font-bold select-none">{"</>"}</p>
      </div>
    </div>
  );
};

export default ModeSelector;
