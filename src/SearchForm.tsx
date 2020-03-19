import { h, Ref } from 'preact';
import { useState } from 'preact/hooks';

import { useDatePicker } from './useDatePicker';

import { getSearchURL, InputEvent } from './utils';
import { setButtonCustomStyles } from './utils/customStyles';

import { CalenderIcon } from './CalendarIcon';

interface SearchFormProps {
  widgetRoot: Ref<HTMLDivElement>;
}
export const SearchForm = ({ widgetRoot }: SearchFormProps) => {
  const today = new Date();

  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const departureDateInput = useDatePicker({
    appendTo: widgetRoot,
    selectedDate: today,
  });

  const returnDateInput = useDatePicker({ appendTo: widgetRoot });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!departureDate || departureDate.length === 0) {
      departureDateInput.current?.focus();
      return;
    }

    const searchURL = getSearchURL(departureDate, returnDate);
    window.open(searchURL, '_blank');
  };

  const handleDepartureInputChange = (e: InputEvent) => {
    setDepartureDate(e.currentTarget.value);
  };

  const handleReturnInputChange = (e: InputEvent) => {
    setReturnDate(e.currentTarget.value);
  };

  return (
    <form className="search-form">
      <div className="inputs">
        <span className="input-wrapper">
          <input
            onChange={handleDepartureInputChange}
            type="text"
            className="input departure-date"
            placeholder="Depart date"
            ref={departureDateInput}
          />
          <CalenderIcon />
        </span>
        <span className="input-wrapper">
          <input
            onChange={handleReturnInputChange}
            type="text"
            className="input return-date"
            placeholder="Return date"
            ref={returnDateInput}
          />
          <CalenderIcon />
        </span>
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        ref={setButtonCustomStyles}
      >
        Search
      </button>
    </form>
  );
};
