import isObject from '../helpers.js';

const wrapWithCurlyBraces = (string, indentCount = 0) => {
  const indent = ' '.repeat(indentCount);
  return `{\n${string}\n${indent}}`;
};

const objectToString = (object, indentCount) => {
  const indent = ' '.repeat(indentCount + 4);

  const pairsString = Object.entries(object)
    .map(([key, val]) => `${indent}${key}: ${val}`)
    .join('\n');

  return wrapWithCurlyBraces(pairsString, indentCount);
};

const getSign = (type) => {
  const signs = {
    unchanged: ' ',
    changed: ' ',
    added: '+',
    removed: '-',
  };

  return signs[type] || null;
};

const formatAsJsObject = (diffColl) => {
  const iter = (diffs, indentCount) => {
    const indent = ' '.repeat(indentCount);
    const diffToString = ({ key, value, type, children }) => {
      const sign = getSign(type);

      if (children) {
        const formatedValue = wrapWithCurlyBraces(
          iter(children, indentCount + 4),
          indentCount + 2,
        );
        return `${indent}${sign} ${key}: ${formatedValue}`;
      }

      const formatedValue = isObject(value)
        ? objectToString(value, indentCount + 2)
        : value;

      return `${indent}${sign} ${key}: ${formatedValue}`;
    };

    const diffString = diffs
      .map(diffToString)
      .join('\n');

    return diffString;
  };

  return wrapWithCurlyBraces(iter(diffColl, 2));
};

export default formatAsJsObject;
