import { useEffect, useState } from "react";
import {
  evaluateArithmetic,
  evaluateBinaryOperators,
} from "../../ResultScreen/utils/operators";
import {
  OPERATORS,
  OPERATORS_VALUES,
  STANDARD_OPERATORS,
  STANDARD_OPERATORS_VALUES,
} from "../../../consts/symbols";

export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileResults, setFileResults] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event?.target?.result as string;
      if (!fileContent) return;
      const expressions = fileContent
        .replaceAll("=", "")
        .replaceAll("\r", "")
        .split("\n");

      const operators = STANDARD_OPERATORS_VALUES.some((op) =>
        expressions[0].includes(op)
      )
        ? STANDARD_OPERATORS
        : OPERATORS_VALUES.some((op) => expressions[0].includes(op))
        ? OPERATORS
        : null;

      const results = expressions.map((expression) => {
        try {
          return `${expression} = ${
            operators
              ? evaluateBinaryOperators(
                  expression,
                  Object.values(operators).includes("&")
                )
              : evaluateArithmetic(expression, false)
          }`;
        } catch (e) {
          return "0";
        }
      });
      setFileResults(results.join("\n"));
    };

    reader.readAsText(selectedFile as Blob);
  }, [selectedFile]);

  return { handleUpload, fileResults, fileName: selectedFile?.name };
};
