import { useContext } from "react";
import { modeContext, modes } from "../../contexts/ModeContext";
import { useFileUpload } from "./hooks/useFIleUpload";
import DownloadButton from "./components/DownloadButton";

const ModeSelector = () => {
  const { mode, selectMode } = useContext(modeContext);
  const { handleUpload, fileResults, fileName } = useFileUpload();

  return (
    <div className="flex flex-col absolute top-2 left-1/2 -translate-x-1/2 gap-3 z-0 md:relative ">
      <div className="flex w-max gap-2 relative rounded-2xl bg-white bg-opacity-10 p-2">
        <div
          className={`bg-primary transition-all z-10 w-12 h-12 left-2  rounded-xl absolute top-2 ${
            mode === modes.SYSTEMIC ? "translate-x-[calc(100%+8px)]" : ""
          }`}
        />
        <div
          onClick={() => selectMode(modes.NUMERIC)}
          className="w-12 h-12 z-20 flex cursor-pointer justify-center items-center rounded-xl"
        >
          <p className="font-bold select-none">123 </p>
        </div>
        <div
          onClick={() => selectMode(modes.SYSTEMIC)}
          className="z-20 w-12 h-12 cursor-pointer flex justify-center items-center rounded-xl"
        >
          <p className="font-bold select-none">{"</>"}</p>
        </div>
      </div>
      <input
        type="file"
        onChange={handleUpload}
        accept=".txt"
        className="hover:bg-opacity-20 transition-colors p-3 rounded-xl bg-white bg-opacity-10 flex gap-2 items-center cursor-pointer"
      />
      {!!fileResults && (
        <DownloadButton fileName={fileName} content={fileResults} />
      )}
    </div>
  );
};

export default ModeSelector;
