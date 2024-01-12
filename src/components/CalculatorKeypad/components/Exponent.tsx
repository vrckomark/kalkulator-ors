import React from "react";

interface ExponentProps {
  base: string | number;
  exponent: string | number;
}

const Exponent: React.FC<ExponentProps> = ({ base, exponent }) => {
  return (
    <div className="relative flex items-center h-max justify-center -translate-x-1/2 translate-y-[10%]">
      <p className="absolute -right-3 -top-2">{exponent}</p>
      <p className="text-3xl font-medium">{base}</p>
    </div>
  );
};

export default Exponent;
