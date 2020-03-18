import { JSX } from 'preact';

const BASE_SEARCH_URL = 'https://www.aviasales.ru/search';

const formatDate = (date: string) => {
  return date.replace('.', '').substring(0, 4);
};

export const getSearchURL = (departureDate: string, returnDate: string) => {
  const departureFormatted = formatDate(departureDate);
  const returnFormatted = returnDate.length !== 0 ? formatDate(returnDate) : '';

  return `${BASE_SEARCH_URL}/LED${departureFormatted}HKT${returnFormatted}201`;
};
export interface InputEvent
  extends JSX.TargetedEvent<HTMLInputElement, Event> {}
