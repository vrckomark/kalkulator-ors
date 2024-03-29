import { useContext, useMemo } from "react";
import { modeContext } from "../../../contexts/ModeContext";
import {
  OPERATORS,
  PI,
  STANDARD_OPERATORS,
  SYSTEMS,
  SystemType,
  numbersChars,
  standaloneOperators,
  standaloneSymbols,
} from "../../../consts/symbols";
import { sanitizeExpression } from "../../../utils/sanitizeExpression";
import {
  convert,
  evaluateArithmetic,
  evaluateBinaryOperators,
  includesOperator,
} from "../utils/operators";
import { historyContext } from "../../../contexts/HistoryContext";

export type HistoryType = {
  expression: string;
  result: string;
};

export const useResultScreen = () => {
  const {
    expression,
    mode: currentMode,
    selectedSystem: system,
    setCurrentSystem,
    setCurrentExpression: setExpression,
  } = useContext(modeContext);

  const { addToHistory } = useContext(historyContext);

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
      systemic: Object.values(
        Object.values(STANDARD_OPERATORS).some((operator) =>
          currentExpression.includes(operator)
        )
          ? STANDARD_OPERATORS
          : OPERATORS
      ),
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
    if (numbersChars.includes(leftChar) && !!leftChar)
      return setExpression(`${currentExpression} * sqrt( `);
    return setExpression(currentExpression + " " + "sqrt( ");
  };

  const evaluate = () => {
    const result = {
      numeric: evaluateArithmetic(currentExpression),
      systemic:
        system === SYSTEMS.BIN
          ? evaluateBinaryOperators(currentExpression)
          : "",
    }[currentMode];
    setExpression(result);
    addToHistory(currentExpression, result);
  };

  const changeSystem = (newSystem: SystemType) => {
    const oldSystem = system;
    setCurrentSystem(newSystem as SystemType);
    if (!includesOperator(currentExpression)) {
      return setExpression(convert(currentExpression, oldSystem, newSystem));
    }
    return setExpression("");
  };

  const addToExpression = (value: string) => {
    if (value === "=") return evaluate();
    if (value === "CLR") return clearExpression();
    if (value === "DEL") return backspaceExpression();
    if (value.includes("sqrt")) return addSquareRootToExpression();
    if (value === PI.slug) return addConstToExpression(PI.symbol);
    if (value === "e") return addConstToExpression("e");
    if (
      [PI.symbol, "e"].includes(sanitizeExpression(currentExpression).slice(-1))
    )
      return setExpression(
        !numbersChars.includes(value)
          ? `${currentExpression} ${value}`
          : `${currentExpression} * ${value}`
      );
    if (value.includes("pow")) return addExponent();
    if (value === "()") return parenthesizeExpression();
    if (Object.values(SYSTEMS).includes(value as SystemType))
      return changeSystem(value as SystemType);
    if (!canAddToExpression(value)) return;

    setExpression(
      value === "." && !currentExpression.length
        ? "0."
        : currentExpression +
            (numbersChars.includes(value) || value === "."
              ? value
              : ` ${value} `)
    );
  };

  const evaluatedExpression = useMemo(() => {
    const openCount = (currentExpression.match(/\(/g) || []).length;
    const closeCount = (currentExpression.match(/\)/g) || []).length;
    if (openCount > closeCount) return "";
    return {
      numeric: evaluateArithmetic(currentExpression),
      systemic:
        system === SYSTEMS.BIN
          ? evaluateBinaryOperators(currentExpression)
          : null,
    }[currentMode];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExpression]);

  return {
    addToExpression,
    onKeyboardInput,
    evaluatedExpression,
  };
};
