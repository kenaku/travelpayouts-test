import { useState, useEffect, useRef } from 'preact/hooks';
import TinyDatePicker from 'tiny-date-picker';

export const useDatePicker = ({ appendTo, selectedDate }: any) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const datePicker = TinyDatePicker(inputRef.current, {
      appendTo: appendTo.current,
      format(date: Date) {
        return date.toLocaleDateString();
      },
      mode: 'dp-below',
      min: new Date(),
      dayOffset: 1,
    });
    selectedDate && datePicker.setState({ selectedDate });
  }, []);
  return inputRef;
};
