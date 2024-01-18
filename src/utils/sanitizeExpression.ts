export const sanitizeExpression = (expression: string) => {
  return expression.replaceAll(" ", "");
};
