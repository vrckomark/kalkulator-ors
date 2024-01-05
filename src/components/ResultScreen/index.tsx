import React from "react";

interface ResultScreenProps {
  expression?: string;
  result?: string | null;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  expression = 0,
  result = null,
}) => {
  return (
    <div className="w-full flex justify-center gap-4 items-end flex-col h-full pr-4">
      <p className="text-[44px] font-medium">{expression}</p>
      <p className="text-3xl opacity-50 font-medium">{result}</p>
    </div>
  );
};

export default ResultScreen;
