import { createDatePicker } from './datePicker';

import { getSearchURL } from './utils';
import { getCalenderIcon } from './calendarIcon';
import { getCustomStyles } from './utils/customStyles';
import { h } from './utils/h';

export const searchForm = (container: Element) => {
  const today = new Date();

  let departureDate = '';
  let returnDate = '';

  const customCalendarIconColor = getCustomStyles('widget-background');
  const customButtonBG = getCustomStyles('submit-button-background');
  const customButtonColor = getCustomStyles('submit-button-color');
  const calendarIcon = getCalenderIcon(customCalendarIconColor);

  const departureInput = h('input', {
    type: 'text',
    class: 'input departure-date',
    placeholder: 'Departure date',
  });

  const returnInput = h('input', {
    type: 'text',
    class: 'input return-date',
    placeholder: 'Return date',
  });

  const departureInputWrapper = h(
    'span',
    { class: 'input-wrapper' },
    departureInput,
    calendarIcon,
  );

  const returnInputWrapper = h(
    'span',
    { class: 'input-wrapper' },
    returnInput,
    calendarIcon,
  );

  const inputs = h(
    'div',
    { class: 'inputs' },
    departureInputWrapper,
    returnInputWrapper,
  );

  const button = h(
    'button',
    {
      class: 'submit-button',
      style: `color:${customButtonColor}; background:${customButtonBG}`,
    },
    'Search',
  );

  const form = h('form', { class: 'search-form' }, inputs, button);

  createDatePicker({
    node: departureInput,
    appendTo: container,
    selectedDate: today,
  });

  createDatePicker({
    node: returnInput,
    appendTo: container,
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!departureDate || departureDate.length === 0) {
      (<HTMLInputElement>departureInput)?.focus();
      return;
    }
    const searchURL = getSearchURL(departureDate, returnDate);
    window.open(searchURL, '_blank');
  };

  const handleDepartureInputChange = (e: Event) => {
    departureDate = (<HTMLInputElement>e.target)?.value;
  };
  const handleReturnInputChange = (e: Event) => {
    returnDate = (<HTMLInputElement>e.target)?.value;
  };

  departureInput.addEventListener('change', handleDepartureInputChange);
  returnInput.addEventListener('change', handleReturnInputChange);
  button.addEventListener('click', handleSubmit);

  return form;
};
