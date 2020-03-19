import { JSX } from 'preact';

const BASE_SEARCH_URL = 'https://www.aviasales.ru/search';

const formatDate = (date: string) => {
  return date.replace('/', '').substring(0, 4);
};

export const getSearchURL = (departureDate: string, returnDate: string) => {
  const departureFormatted = formatDate(departureDate);
  const returnFormatted = returnDate.length !== 0 ? formatDate(returnDate) : '';

  return `${BASE_SEARCH_URL}/LED${departureFormatted}HKT${returnFormatted}201`;
};

const availableStyles = [
  'submit-button-background',
  'submit-button-color',
  'widget-background',
  'widget-color',
];

export const getCustomStyles = (node: HTMLOrSVGScriptElement) => {
  const styles: {
    [key: string]: string;
  } = {};
  // наивная проверка на валидность хекс-цветов, чтобы скрипт не пропихнули
  const isValid = (color: string) => color.length < 10;

  availableStyles.forEach(attribute => {
    const value = node.getAttribute(`data-${attribute}`);
    if (!value || !isValid(value)) {
      return;
    }
    styles[attribute] = value;
  });

  return styles;
};

export interface InputEvent
  extends JSX.TargetedEvent<HTMLInputElement, Event> {}
