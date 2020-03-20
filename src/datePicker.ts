import TinyDatePicker from 'tiny-date-picker';

export const createDatePicker = ({ node, appendTo, selectedDate }: any) => {
  const datePicker = TinyDatePicker(node, {
    appendTo,
    format(date: Date) {
      return date.toLocaleDateString();
    },
    mode: 'dp-below',
    min: new Date(),
    dayOffset: 1,
  });
  selectedDate && datePicker.setState({ selectedDate });
  return datePicker;
};
