import { render, h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import datePicker from 'flatpickr';
import './widget.css';

import { useWidgetSize } from './useWidgetSize';
import { CalenderIcon } from './CalendarIcon';
import { getSearchURL, InputEvent } from './utils';

const container = document.currentScript?.parentElement;

if (container) {
  const Widget = () => {
    const widgetSize = useWidgetSize(container);
    const widgetRoot = useRef<HTMLDivElement>(null);

    const departureDateInput = useRef<HTMLInputElement>(null);
    const returnDateInput = useRef<HTMLInputElement>(null);

    const [departureDate, setDepartureDate] = useState<string>('');
    const [returnDate, setReturnDate] = useState<string>('');

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

    useEffect(() => {
      datePicker(departureDateInput.current, {
        minDate: new Date(),
        defaultDate: new Date(),
        appendTo: widgetRoot.current,
        dateFormat: 'd.m.Y',
        onChange: dates => {
          if (dates.length !== 0) {
            returnDatePicker.set('minDate', dates[0]);
          }
        },
        onReady: (dates, currentDate) => {
          setDepartureDate(currentDate);
        },
      });
      const returnDatePicker = datePicker(returnDateInput.current, {
        minDate: new Date(),
        appendTo: widgetRoot.current,
        dateFormat: 'd.m.Y',
      });
    }, []);

    return (
      <section className="slowpoke_tp_widget" ref={widgetRoot}>
        <div className={`widget widget-size-${widgetSize}`}>
          <h3 className="title">Where does it come from? Why do we use it?</h3>
          <div className="note">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </div>
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
            <button className="submit-button" onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </section>
    );
  };
  render(<Widget />, container);
}
