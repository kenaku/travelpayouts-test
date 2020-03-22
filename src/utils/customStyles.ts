const availableStyles = [
  'submit-button-background',
  'submit-button-color',
  'widget-background',
  'widget-color',
];

const attributesSource = document.currentScript;

// наивная проверка, чтобы скрипт не пропихнули
const isValid = (color: string) => color.length < 10;

export const getCustomStyles = (attribute: string) => {
  if (!attributesSource || !availableStyles.includes(attribute)) {
    return '';
  }
  const value = attributesSource.getAttribute(`data-${attribute}`);
  if (!value || !isValid(value)) {
    return '';
  }
  return value ? `${value}!important` : '';
};
