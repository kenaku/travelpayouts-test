import { useEffect, useRef } from 'preact/hooks';

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

  // наивная проверка, чтобы скрипт не пропихнули
  const isValid = (style: string) => style.length < 10;

  availableStyles.forEach(attribute => {
    const value = node.getAttribute(`data-${attribute}`);
    if (!value || !isValid(value)) {
      return;
    }
    styles[attribute] = value;
  });

  return styles;
};

export const useCustomStyles = <T>(styles: any, targetName: string) => {
  const ref = useRef<HTMLDivElement | HTMLButtonElement>();
  useEffect(() => {
    ref.current?.style.setProperty(
      'color',
      styles[`${targetName}-background`],
      'important',
    );
    ref.current?.style.setProperty(
      'background',
      styles[`${targetName}-color`],
      'important',
    );
  }, []);
  return ref;
};
