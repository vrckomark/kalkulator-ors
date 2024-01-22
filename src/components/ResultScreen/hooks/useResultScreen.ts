import { useContext, useRef } from "react";
import { modeContext } from "../../../contexts/ModeContext";
import {
  OPERATORS,
  SYSTEMS,
  SystemType,
  hexChars,
  standaloneOperators,
  standaloneSymbols,
} from "../../../consts/symbols";
import { sanitizeExpression } from "../../../utils/sanitizeExpression";

export const useResultScreen = () => {
  const {
    expression,
    mode: currentMode,
    selectedSystem: system,
    setCurrentSystem,
    setCurrentExpression: setExpression,
  } = useContext(modeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearExpression = () => {
    setExpression("");
  };

  const evaluateExpression = () => {
    //evaluate
    setExpression("15");
  };

  const onKeyboardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
  };

  const canAddToExpression = (value: string) => {
    const currentNode = expression[currentMode].substring(
      expression[currentMode].lastIndexOf(" ") + 1
    );
    return !(
      ((standaloneSymbols.includes(value) || // 1
        standaloneOperators.includes(value)) &&
        !sanitizeExpression(expression[currentMode]).length &&
        !["-", OPERATORS.NOT].includes(value)) ||
      (currentNode.includes(".") && value === ".") || // 2
      (standaloneOperators.includes(
        // 3
        sanitizeExpression(expression[currentMode]).slice(-1)
      ) &&
        standaloneOperators.includes(value)) || // 4
      (standaloneSymbols.includes(
        sanitizeExpression(expression[currentMode]).slice(-1)
      ) &&
        (standaloneSymbols.includes(value) ||
          value.includes("pow") ||
          value.includes("sqrt"))) ||
      value.includes("(") ||
      // 5
      (sanitizeExpression(expression[currentMode]).slice(-1) ===
        OPERATORS.NOT &&
        standaloneOperators.includes(value)) ||
      (value === OPERATORS.NOT &&
        hexChars.includes(
          sanitizeExpression(expression[currentMode]).slice(-1)
        ) &&
        sanitizeExpression(expression[currentMode]).length) ||
      (sanitizeExpression(expression[currentMode]).slice(-1) === "(" &&
        { numeric: standaloneSymbols, systemic: standaloneOperators }[
          currentMode
        ].includes(value) &&
        value !== "-")
    );
  };

  const parenthesizeExpression = () => {
    const currentExpression = expression[currentMode];
    const right = currentExpression.substring(
      currentExpression.lastIndexOf("(") + 1
    );
    const isLastCharSymbol = {
      numeric: standaloneSymbols,
      systemic: standaloneOperators,
    }[currentMode].some(
      (symbol) => sanitizeExpression(right).slice(-1) === symbol
    );
    if (
      currentExpression.split("(").length - 1 ===
        currentExpression.split(")").length - 1 &&
      sanitizeExpression(currentExpression).length
    )
      return setExpression(
        `${currentExpression} ${
          !isLastCharSymbol
            ? { numeric: "*", systemic: OPERATORS.AND }[currentMode]
            : ""
        } ( `
      );

    if (!currentExpression.includes("(") || isLastCharSymbol || !right.length)
      return setExpression(`${currentExpression}( `);
    return setExpression(`${currentExpression} )`);
  };

  const backspaceExpression = () => {
    let lastAppearanceIndex = -1;
    const str = expression[currentMode];

    for (const symbol of standaloneSymbols) {
      const index = str.lastIndexOf(symbol);

      if (index > lastAppearanceIndex) {
        lastAppearanceIndex = index;
      }
    }

    const result = str.substring(0, lastAppearanceIndex);
    setExpression(result);
  };

  const addToExpression = (value: string) => {
    if (value === "CLR") return clearExpression();
    if (value.includes("pow")) return clearExpression();
    if (value === "DEL") return backspaceExpression();
    if (value === "=") return evaluateExpression();
    if (value === "()") return parenthesizeExpression();
    if (Object.values(SYSTEMS).includes(value as SystemType))
      return setCurrentSystem(value as SystemType);
    if (!canAddToExpression(value)) return;

    const caretPos = inputRef.current?.selectionEnd || 0;

    setExpression(
      caretPos > 0
        ? expression[currentMode].slice(0, caretPos) +
            (hexChars.includes(value) || value === "." ? value : ` ${value} `) +
            expression[currentMode].slice(caretPos)
        : expression[currentMode] +
            (hexChars.includes(value) || value === "." ? value : ` ${value} `)
    );
  };

  return {
    inputRef,
    addToExpression,
    onKeyboardInput,
  };
};
