import { createDatePicker } from './datePicker';

import { getSearchURL } from './utils';
import { getCalenderIcon } from './calendarIcon';
import { getCustomStyles } from './utils/customStyles';

export const searchForm = (container: Element) => {
  const today = new Date();
  const form = document.createElement('form');
  const customCalendarIconColor = getCustomStyles('widget-background');
  const customButtonBG = getCustomStyles('submit-button-background');
  const customButtonColor = getCustomStyles('submit-button-color');
  const calendarIcon = getCalenderIcon(customCalendarIconColor);

  const formMarkup = `
    <div class="inputs">
      <span class="input-wrapper">
        <input
          type="text"
          class="input departure-date"
          placeholder="Depart date"
        />
        ${calendarIcon}
      </span>
      <span class="input-wrapper">
        <input
          type="text"
          class="input return-date"
          placeholder="Return date"
        />
        ${calendarIcon}
      </span>
    </div>
    <button
      class="submit-button"
      style="color:${customButtonColor};background:${customButtonBG}"
    >
      Search
    </button>
  `;

  form.innerHTML = formMarkup;
  form.classList.add('search-form');

  let departureDate = '';
  let returnDate = '';

  const departureInput = form.querySelector('.departure-date');
  const returnInput = form.querySelector('.return-date');
  const button = form.querySelector('.submit-button');

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
  departureInput?.addEventListener('change', handleDepartureInputChange);
  returnInput?.addEventListener('change', handleReturnInputChange);
  button?.addEventListener('click', handleSubmit);

  return form;
};
