import { useEffect, useState } from 'preact/hooks';

const matchWidgetSize = (width: number): string => {
  switch (true) {
    case width <= 400:
      return 'xs';
    case width <= 600:
      return 's';
    case width <= 1000:
      return 'm';
    default:
      return 'l';
  }
};

export const useWidgetSize = (container: HTMLElement) => {
  const initialWidgetSize = matchWidgetSize(
    container.getBoundingClientRect().width,
  );

  const [widgetSize, setWidgetSize] = useState(initialWidgetSize);

  const handleResize = () => {
    setWidgetSize(matchWidgetSize(container.getBoundingClientRect().width));
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return widgetSize;
};
