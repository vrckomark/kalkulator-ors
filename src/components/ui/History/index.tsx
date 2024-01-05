import React from "react";
import { FaHistory } from "react-icons/fa";
import { useHistory } from "./hooks/useHistory";
import { RxCross2 } from "react-icons/rx";

export type ExpressionType = {
  expression: string;
  result: string;
};

interface HistoryProps {
  history?: ExpressionType[];
}

const History: React.FC<HistoryProps> = () => {
  const { showOverlay, toggleOverlay } = useHistory();
  return (
    <>
      <button
        onClick={toggleOverlay}
        className="flex lg:hidden p-4 hover:bg-opacity-10 transition-[background] bg-white bg-opacity-5 rounded-xl absolute top-2 right-2 sm:top-4 sm:right-4"
      >
        <FaHistory className="text-2xl" />
      </button>
      <HistoryOverlay show={showOverlay} toggle={toggleOverlay} />
      <div className="h-full hidden lg:flex items-center px-8 py-6 bg-white bg-opacity-15 rounded-2xl w-1/3 flex-col overflow-hidden">
        <h2 className="mb-4">History</h2>
        <div className="flex flex-col w-full overflow-auto">
          {/* <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p>
        <p>asd</p> */}
        </div>
      </div>
    </>
  );
};

const HistoryOverlay = ({
  show,
  toggle,
}: {
  show: boolean;
  toggle: () => void;
}) => {
  return (
    <>
      <button
        onClick={toggle}
        className={`absolute p-4 ${
          show ? "flex" : "hidden"
        } top-2 right-2 sm:top-4 sm:right-4 z-30`}
      >
        <RxCross2 size={32} />
      </button>
      <div
        style={{
          boxShadow: "0 0 50px 10px rgba(0,0,0,0.5)",
        }}
        className={`flex transition py-4 px-8 flex-col items-center absolute right-0 top-0 h-screen w-screen z-20 sm:w-[70vw] bg-[#0f0f0f] lg:hidden ${
          !show ? "translate-x-full" : ""
        }`}
      >
        <h1 className="text-3xl">History</h1>
      </div>
    </>
  );
};

export default History;
