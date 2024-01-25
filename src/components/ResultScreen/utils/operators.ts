import {
  OPERATORS,
  PI,
  SystemType,
  hexChars,
  systemValues,
} from "../../../consts/symbols";
import { sanitizeExpression } from "../../../utils/sanitizeExpression";

export const balanceParentheses = (expression: string) => {
  const openCount = (expression.match(/\(/g) || []).length;
  const closeCount = (expression.match(/\)/g) || []).length;

  const missingClosingParentheses = Math.max(0, openCount - closeCount);

  const closingParentheses = ")".repeat(missingClosingParentheses);

  return expression + closingParentheses;
};

const padZeros = (operands: [string, string]) => {
  return [
    operands[0].padStart(operands[1].length, "0"),
    operands[1].padStart(operands[0].length, "0"),
  ];
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

export const includesOperator = (expression: string) => {
  return Object.values(OPERATORS).some((operator) =>
    expression.includes(operator)
  );
};

export const evaluateBinaryOperators = (
  expression: string,
  standardSymbols: boolean = false
) => {
  if (includesOperator(sanitizeExpression(expression).slice(-1))) {
    return expression;
  }

  const sanitizedExpression = balanceParentheses(
    sanitizeExpression(expression)
  ).toUpperCase();
  return evaluateLogicalOperators(sanitizedExpression, standardSymbols);
};

const evaluateLogicalOperators = (
  expression: string,
  standardSymbols: boolean = false
) => {
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

      if (
        startIndex > 0 &&
        expression[startIndex - 1] === (standardSymbols ? "!" : "¬")
      ) {
        result = bitwiseNot(result);
        startIndex--;
      }

      expression =
        expression.slice(0, startIndex) + result + expression.slice(i + 1);

      i = startIndex + result.length - 1;
    }
  }

  while (expression.includes(standardSymbols ? "!" : "¬")) {
    expression = expression.replace(
      standardSymbols ? /!(\d+)/g : /¬(\d+)/g,
      (_, a) => bitwiseNot(a)
    );
  }

  while (expression.includes(standardSymbols ? "&" : "∧")) {
    expression = expression.replace(
      standardSymbols ? /(\d+)\s*&\s*(\d+)/g : /(\d+)\s*∧\s*(\d+)/g,
      (_, a, b) => bitwiseAnd(a, b)
    );
  }

  while (expression.includes(standardSymbols ? "|" : "∨")) {
    expression = expression.replace(
      standardSymbols ? /(\d+)\s*\|\s*(\d+)/g : /(\d+)\s*∨\s*(\d+)/g,
      (_, a, b) => bitwiseOr(a, b)
    );
  }

  while (expression.includes(standardSymbols ? "XOR" : "⊻")) {
    expression = expression.replace(
      standardSymbols ? /(\d+)\s*XOR\s*(\d+)/g : /(\d+)\s*⊻\s*(\d+)/g,
      (_, a, b) => bitwiseXor(a, b)
    );
  }

  while (expression.includes(standardSymbols ? "NAND" : "↑")) {
    expression = expression.replace(
      standardSymbols ? /(\d+)\s*NAND\s*(\d+)/g : /(\d+)\s*↑\s*(\d+)/g,
      (_, a, b) => bitwiseNand(a, b)
    );
  }

  while (expression.includes(standardSymbols ? "NOR" : "↓")) {
    expression = expression.replace(
      standardSymbols ? /(\d+)\s*NOR\s*(\d+)/g : /(\d+)\s*↓\s*(\d+)/g,
      (_, a, b) => bitwiseNor(a, b)
    );
  }

  return expression;
};

const evaluateExpression = (expression: string): number => {
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
    sqrt: 4,
  };

  type PrecedenceType = keyof typeof precedence;

  // eslint-disable-next-line no-prototype-builtins
  const isOperator = (token: string) => precedence.hasOwnProperty(token);

  const shuntingYard = (tokens: string[]): string[] => {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
        outputQueue.push(token);
      } else if (isOperator(token)) {
        while (
          operatorStack.length &&
          precedence[
            operatorStack[operatorStack.length - 1] as PrecedenceType
          ] >= precedence[token as PrecedenceType]
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.pop();
      }
    }

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop()!);
    }

    return outputQueue;
  };

  const evaluatePostfix = (postfix: string[]): number => {
    const stack: number[] = [];

    for (const token of postfix) {
      if (!isNaN(parseFloat(token))) {
        stack.push(parseFloat(token));
      } else if (isOperator(token)) {
        if (token === "sqrt") {
          const operand = stack.pop()!;
          stack.push(Math.sqrt(operand));
        } else {
          const b = stack.pop()!;
          const a = stack.pop()!;
          switch (token) {
            case "+":
              stack.push(a + b);
              break;
            case "-":
              stack.push(a - b);
              break;
            case "*":
              stack.push(a * b);
              break;
            case "/":
              stack.push(a / b);
              break;
            case "%":
              stack.push(a % b);
              break;
            case "^":
              stack.push(Math.pow(a, b));
              break;
          }
        }
      }
    }

    return stack.pop()!;
  };

  const tokens = expression
    .replace(/(\d+(?:\.\d+)?|\^|\*|\/|%|\+|-|\(|\)|sqrt)/g, " $1 ")
    .trim()
    .split(/\s+/);

  const outputQueue = shuntingYard(tokens);
  const result = evaluatePostfix(outputQueue);

  return result;
};

export const evaluateArithmetic = (
  expression: string,
  format: boolean = true
) => {
  if (
    !expression ||
    expression.split("").some((char) => "ABCDEF".includes(char))
  )
    return expression;
  try {
    const balancedExpression = sanitizeExpression(
      balanceParentheses(expression)
    )
      .replaceAll(PI.symbol, Math.PI.toString())
      .replaceAll("e", Math.E.toString())
      .replaceAll(",", "");
    return format
      ? evaluateExpression(balancedExpression).toLocaleString("default", {
          maximumFractionDigits: 3,
        })
      : evaluateExpression(balancedExpression).toString();
  } catch (e) {
    console.error(e);
    return "0";
  }
};

export const convert = (
  expression: string,
  fromSystem: SystemType,
  toSystem: SystemType
) => {
  if (includesOperator(expression)) return "";
  const balancedExpression = sanitizeExpression(expression).toUpperCase();

  const decValue = balancedExpression.split("").reduce((acc, char) => {
    return acc * systemValues[fromSystem] + hexChars.indexOf(char);
  }, 0);

  let newVal = decValue;
  let result = "";
  while (newVal > 0) {
    const char = hexChars[newVal % systemValues[toSystem]];
    newVal = Math.floor(newVal / systemValues[toSystem]);
    result += char;
  }

  return result.split("").reverse().join("");
};
