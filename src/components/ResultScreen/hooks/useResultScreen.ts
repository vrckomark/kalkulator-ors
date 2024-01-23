import { useContext, useMemo, useRef } from "react";
import { modeContext } from "../../../contexts/ModeContext";
import {
  OPERATORS,
  PI,
  SYSTEMS,
  SystemType,
  numbersChars,
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

  const currentExpression = expression[currentMode];

  const clearExpression = () => {
    setExpression("");
  };

  const onKeyboardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
  };

  const canAddToExpression = (value: string) => {
    const currentNode = currentExpression.substring(
      currentExpression.lastIndexOf(" ") + 1
    );
    return !(
      ((standaloneSymbols.includes(value) || // 1
        standaloneOperators.includes(value)) &&
        !sanitizeExpression(currentExpression).length &&
        !["-", OPERATORS.NOT].includes(value)) ||
      (currentNode.includes(".") && value === ".") || // 2
      (standaloneOperators.includes(
        // 3
        sanitizeExpression(currentExpression).slice(-1)
      ) &&
        standaloneOperators.includes(value)) || // 4
      (standaloneSymbols.includes(
        sanitizeExpression(currentExpression).slice(-1)
      ) &&
        (standaloneSymbols.includes(value) ||
          value.includes("pow") ||
          value.includes("sqrt"))) ||
      value.includes("(") ||
      // 5
      (sanitizeExpression(currentExpression).slice(-1) === OPERATORS.NOT &&
        standaloneOperators.includes(value)) ||
      (value === OPERATORS.NOT &&
        numbersChars.includes(
          sanitizeExpression(currentExpression).slice(-1)
        ) &&
        sanitizeExpression(currentExpression).length) ||
      (sanitizeExpression(currentExpression).slice(-1) === "(" &&
        { numeric: standaloneSymbols, systemic: standaloneOperators }[
          currentMode
        ].includes(value) &&
        value !== "-")
    );
  };

  const parenthesizeExpression = () => {
    const right = currentExpression.substring(
      currentExpression.lastIndexOf("(") + 1
    );
    if (sanitizeExpression(currentExpression).slice(-1) === "(")
      return setExpression(currentExpression + "( ");
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
    const str = currentExpression;

    for (const symbol of standaloneSymbols) {
      const index = str.lastIndexOf(symbol);

      if (index > lastAppearanceIndex) {
        lastAppearanceIndex = index;
      }
    }

    const result = str.substring(0, lastAppearanceIndex);
    setExpression(result);
  };

  const addConstToExpression = (val: string) => {
    const leftChar = sanitizeExpression(currentExpression).slice(-1);
    if (numbersChars.includes(leftChar) && leftChar)
      return setExpression(currentExpression + " * " + val);
    return setExpression(currentExpression + " " + val);
  };

  const addExponent = () => {
    const leftChar = sanitizeExpression(currentExpression).slice(-1);
    if ((!numbersChars.includes(leftChar) && leftChar !== ")") || !leftChar)
      return;
    return setExpression(currentExpression + "^( ");
  };

  const addSquareRootToExpression = () => {
    const leftChar = sanitizeExpression(currentExpression).slice(-1);
    if (numbersChars.includes(leftChar) && leftChar)
      return setExpression(currentExpression + " * " + "sqrt( ");
    return setExpression(currentExpression + " " + "sqrt( ");
  };

  const evaluateExpression = (expression: string): number => {
    // Helper function to perform exponentiation
    const power = (base: number, exponent: number) => {
      return Math.pow(base, exponent);
    };

    // Helper function to evaluate expressions inside square roots and exponents
    const evaluateNestedExpression = (subExpression: string): number => {
      return evaluateExpression(subExpression);
    };

    // Replace square root and exponentiation with their respective functions
    expression = expression.replace(/sqrt\(([^)]+)\)/g, (_, inside) =>
      Math.sqrt(evaluateNestedExpression(inside)).toString()
    );
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\^\s*\(([^)]+)\)/g,
      (_, base, exponent) => power(Number(base), Number(exponent)).toString()
    );
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g,
      (_, base, exponent) => power(Number(base), Number(exponent)).toString()
    );

    // Evaluate the expression within parentheses
    while (expression.includes("(")) {
      expression = expression.replace(/\(([^()]+)\)/g, (_, subExpression) =>
        evaluateExpression(subExpression).toString()
      );
    }

    // Evaluate multiplication and division
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\*\s*(\d+(?:\.\d+)?)/g,
      (_, factor1, factor2) =>
        (Number(factor1) * Number(evaluateNestedExpression(factor2))).toString()
    );
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g,
      (_, numerator, denominator) =>
        (
          Number(numerator) / Number(evaluateNestedExpression(denominator))
        ).toString()
    );

    // Evaluate addition and subtraction
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)/g,
      (_, addend1, addend2) =>
        (Number(addend1) + Number(evaluateNestedExpression(addend2))).toString()
    );
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g,
      (_, minuend, subtrahend) =>
        (
          Number(minuend) - Number(evaluateNestedExpression(subtrahend))
        ).toString()
    );

    return Number(expression);
  };

  const balanceParentheses = (expression: string) => {
    const openCount = (expression.match(/\(/g) || []).length;
    const closeCount = (expression.match(/\)/g) || []).length;

    const missingClosingParentheses = Math.max(0, openCount - closeCount);

    const closingParentheses = ")".repeat(missingClosingParentheses);

    return expression + closingParentheses;
  };

  const evaluate = () => {
    const balancedExpression = sanitizeExpression(
      balanceParentheses(currentExpression)
    )
      .replaceAll(PI.symbol, Math.PI.toString())
      .replaceAll("e", Math.E.toString());
    return setExpression(
      evaluateExpression(balancedExpression).toLocaleString("default", {
        maximumFractionDigits: 3,
      })
    );
  };

  const addToExpression = (value: string) => {
    if (value === "=") return evaluate();
    if (value === "CLR") return clearExpression();
    if (value === "DEL") return backspaceExpression();
    if (value.includes("sqrt")) addSquareRootToExpression();
    if (
      [PI.symbol, "e"].includes(sanitizeExpression(currentExpression).slice(-1))
    )
      return setExpression(`${currentExpression} * ${value}`);
    if (value === PI.slug) return addConstToExpression(PI.symbol);
    if (value === "e") return addConstToExpression("e");
    if (value.includes("pow")) return addExponent();
    if (value === "()") return parenthesizeExpression();
    if (Object.values(SYSTEMS).includes(value as SystemType))
      return setCurrentSystem(value as SystemType);
    if (!canAddToExpression(value)) return;

    const caretPos = inputRef.current?.selectionEnd || 0;

    setExpression(
      caretPos > 0
        ? currentExpression.slice(0, caretPos) +
            (numbersChars.includes(value) || value === "."
              ? value
              : ` ${value} `) +
            currentExpression.slice(caretPos)
        : currentExpression +
            (numbersChars.includes(value) || value === "."
              ? value
              : ` ${value} `)
    );
  };

  const evaluatedExpression = 0;
  // const evaluatedExpression = useMemo(() => {
  //   return evaluateExpression(
  //     sanitizeExpression(currentExpression)
  //       .replaceAll(PI.symbol, Math.PI.toString())
  //       .replaceAll("e", Math.E.toString())
  //   ).toLocaleString("default", { maximumFractionDigits: 3 });
  // }, [currentExpression]);

  return {
    inputRef,
    addToExpression,
    onKeyboardInput,
    evaluatedExpression,
  };
};
