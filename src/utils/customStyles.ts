const availableStyles = [
  'submit-button-background',
  'submit-button-color',
  'widget-background',
  'widget-color',
];

const attributesSource = document.currentScript;

// наивная проверка на валидность хекс-цветов, чтобы скрипт не пропихнули
const isValid = (color: string) => color.length < 10;

export const getCustomStyles = () => {
  if (!attributesSource) {
    return {};
  }
  const styles: {
    [key: string]: string;
  } = {};

  availableStyles.forEach(attribute => {
    const value = attributesSource.getAttribute(`data-${attribute}`);
    if (!value || !isValid(value)) {
      return;
    }
    styles[attribute] = value;
  });

  return styles;
};

const customStyles = getCustomStyles();

// как выяснилось, в реакте можно инлайново выставить important только через реф
export const setWidgetCustomStyles = (el: HTMLDivElement | null) => {
  el?.style.setProperty(
    'background',
    customStyles['widget-background'],
    'important',
  );
  el?.style.setProperty('color', customStyles['widget-color'], 'important');
};

export const setButtonCustomStyles = (el: HTMLButtonElement | null) => {
  el?.style.setProperty(
    'background',
    customStyles['submit-button-background'],
    'important',
  );

  el?.style.setProperty(
    'color',
    customStyles['submit-button-color'],
    'important',
  );
};
