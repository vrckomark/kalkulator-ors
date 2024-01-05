import React from "react";

export type ExpressionType = {
  expression: string;
  result: string;
};

interface HistoryProps {
  history?: ExpressionType[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  console.log(history);
  return (
    <div className="h-full items-center px-8 py-6 bg-white bg-opacity-15 rounded-2xl w-1/3 flex flex-col overflow-hidden">
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
  );
};

export default History;
