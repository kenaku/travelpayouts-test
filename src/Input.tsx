import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import TinyDatePicker from 'tiny-date-picker';

import { CalenderIcon } from './CalendarIcon';
import { InputEvent } from './utils';

export const Input = ({
  onChange,
  selectedDate,
  appendPickerTo,
  ...props
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const today = new Date();
  console.log(appendPickerTo);

  const handleChange = (e: InputEvent) => {
    onChange(e.currentTarget.value);
  };

  useEffect(() => {
    const departureDatePicker = TinyDatePicker(inputRef.current, {
      appendTo: appendPickerTo.current,
      format(date: Date) {
        return date.toLocaleDateString();
      },
      mode: 'dp-below',
      min: today,
      dayOffset: 1,
    });
    departureDatePicker.setState({ selectedDate });
  }, []);

  return (
    <span className="input-wrapper">
      <input
        type="text"
        className="input"
        ref={inputRef}
        {...props}
        onChange={handleChange}
      />
      <CalenderIcon />
    </span>
  );
};

import { render, h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import './widget.css';

import { useWidgetSize } from './useWidgetSize';
import { CalenderIcon } from './CalendarIcon';
import { getSearchURL, InputEvent } from './utils';
import TinyDatePicker from 'tiny-date-picker';
import { Input } from './Input';
const container = document.currentScript?.parentElement;
// console.log(document.currentScript?.getAttribute('data-color'));

if (container) {
  const Widget = () => {
    const widgetSize = useWidgetSize(container);
    const widgetRoot = useRef<HTMLDivElement>(null);

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
              <Input
                onChange={setDepartureDate}
                placeholder="Depart date"
                appendPickerTo={widgetRoot}
                selectedDate={new Date()}
              />
              <Input onChange={setReturnDate} placeholder="Return date" />
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
