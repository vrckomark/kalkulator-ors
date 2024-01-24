import { OPERATORS, PI } from "../../../consts/symbols";
import { sanitizeExpression } from "../../../utils/sanitizeExpression";

export const balanceParentheses = (expression: string) => {
  const openCount = (expression.match(/\(/g) || []).length;
  const closeCount = (expression.match(/\)/g) || []).length;

  const missingClosingParentheses = Math.max(0, openCount - closeCount);

  const closingParentheses = ")".repeat(missingClosingParentheses);

  return expression + closingParentheses;
};

const padZeros = (operands: [string, string]) => {
  if (operands[0].length > operands[1].length)
    operands[1].padStart(operands[0].length, "0");
  if (operands[0].length < operands[1].length)
    operands[0].padStart(operands[1].length, "0");
  return operands;
};

const and = (a: string | number, b: string | number) => {
  return Number(!!Number(a) && !!Number(b));
};
const or = (a: string | number, b: string | number) => {
  return Number(!!Number(a) || !!Number(b));
};
const xor = (a: string | number, b: string | number) => {
  return Number(!!Number(a) !== !!Number(b));
};

export const bitwiseAnd = (a: string, b: string) => {
  [a, b] = padZeros([a, b]);
  let result = "";
  for (let i = 0; i < a.length; i++) {
    result += and(a[i], b[i]);
  }
  return result;
};

export const bitwiseOr = (a: string, b: string) => {
  [a, b] = padZeros([a, b]);
  let result = "";
  for (let i = 0; i < a.length; i++) {
    result += or(a[i], b[i]);
  }
  return result;
};

export const bitwiseXor = (a: string, b: string) => {
  [a, b] = padZeros([a, b]);
  let result = "";
  for (let i = 0; i < a.length; i++) {
    result += xor(a[i], b[i]);
  }
  return result;
};

export const bitwiseNot = (a: string) => {
  let result = "";
  for (let i = 0; i < a.length; i++) {
    result += Number(!Number(a[i]));
  }
  return result;
};

export const bitwiseNand = (a: string, b: string) => {
  return bitwiseNot(bitwiseAnd(a, b));
};

export const bitwiseNor = (a: string, b: string) => {
  return bitwiseNot(bitwiseOr(a, b));
};

export const evaluateBinaryOperators = (expression: string) => {
  if (
    Object.values(OPERATORS).includes(sanitizeExpression(expression).slice(-1))
  ) {
    return expression;
  }

  const sanitizedExpression = balanceParentheses(
    sanitizeExpression(expression)
  );
  return evaluateLogicalOperators(sanitizedExpression);
};

const evaluateLogicalOperators = (expression: string) => {
  const stack: number[] = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === "(") {
      stack.push(i);
    } else if (char === ")") {
      let startIndex = stack.pop();
      if (startIndex === undefined) {
        console.error("Mismatched parentheses");
        return expression;
      }

      const subExpression = expression.slice(startIndex + 1, i);
      let result = evaluateLogicalOperators(subExpression);

      // Check if the character before the "(" is a NOT operator
      if (startIndex > 0 && expression[startIndex - 1] === "¬") {
        result = bitwiseNot(result);
        // Adjust the start index to include the NOT operator in the replacement
        startIndex--;
      }

      expression =
        expression.slice(0, startIndex) + result + expression.slice(i + 1);

      i = startIndex + result.length - 1;
    }
  }

  while (expression.includes("¬")) {
    expression = expression.replace(/¬(\d+)/g, (_, a) => bitwiseNot(a));
  }

  while (expression.includes("∧")) {
    expression = expression.replace(/(\d+)\s*∧\s*(\d+)/g, (_, a, b) =>
      bitwiseAnd(a, b)
    );
  }

  while (expression.includes("∨")) {
    expression = expression.replace(/(\d+)\s*∨\s*(\d+)/g, (_, a, b) =>
      bitwiseOr(a, b)
    );
  }

  while (expression.includes("⊻")) {
    expression = expression.replace(/(\d+)\s*⊻\s*(\d+)/g, (_, a, b) =>
      bitwiseXor(a, b)
    );
  }

  while (expression.includes("↑")) {
    expression = expression.replace(/(\d+)\s*↑\s*(\d+)/g, (_, a, b) =>
      bitwiseNand(a, b)
    );
  }

  while (expression.includes("↓")) {
    expression = expression.replace(/(\d+)\s*↓\s*(\d+)/g, (_, a, b) =>
      bitwiseNor(a, b)
    );
  }

  return expression;
};

const evaluateExpression = (expression: string): number => {
  if (/(\*|\/|\+|-|%)$/.test(expression))
    return Number(expression.slice(0, -1));
  const power = (base: number, exponent: number) => {
    return Math.pow(base, exponent);
  };

  const evaluateNestedExpression = (subExpression: string): number => {
    return evaluateExpression(subExpression);
  };

  expression = expression.replace(/sqrt\(([^)]+)\)/g, (_, inside) =>
    Math.sqrt(evaluateNestedExpression(inside)).toString()
  );

  while (expression.includes("^")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g,
      (_, base, exponent) => power(Number(base), Number(exponent)).toString()
    );
  }

  while (expression.includes("(")) {
    expression = expression.replace(/\(([^()]+)\)/g, (_, subExpression) =>
      evaluateExpression(subExpression).toString()
    );
  }

  while (expression.includes("*")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\*\s*(\d+(?:\.\d+)?)/g,
      (_, factor1, factor2) =>
        (Number(factor1) * Number(evaluateNestedExpression(factor2))).toString()
    );
  }

  while (expression.includes("/")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g,
      (_, numerator, denominator) =>
        (
          Number(numerator) / Number(evaluateNestedExpression(denominator))
        ).toString()
    );
  }

  while (expression.includes("+")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)/g,
      (_, addend1, addend2) =>
        (Number(addend1) + Number(evaluateNestedExpression(addend2))).toString()
    );
  }

  while (expression.includes("-")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g,
      (_, minuend, subtrahend) =>
        (
          Number(minuend) - Number(evaluateNestedExpression(subtrahend))
        ).toString()
    );
  }

  while (expression.includes("%")) {
    expression = expression.replace(
      /(\d+(?:\.\d+)?)\s*%\s*(\d+(?:\.\d+)?)/g,
      (_, dividend, divisor) =>
        (
          Number(dividend) % Number(evaluateNestedExpression(divisor))
        ).toString()
    );
  }

  return Number(expression);
};

export const evaluateArithmetic = (expression: string) => {
  const balancedExpression = sanitizeExpression(balanceParentheses(expression))
    .replaceAll(PI.symbol, Math.PI.toString())
    .replaceAll("e", Math.E.toString());
  return evaluateExpression(balancedExpression).toLocaleString("default", {
    maximumFractionDigits: 3,
  });
};
