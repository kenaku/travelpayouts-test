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

export const syncWidgetSize = (container: HTMLElement) => {
  const node = container.querySelector('.widget');

  const getSize = () =>
    matchWidgetSize(container.getBoundingClientRect().width);

  let currentWidgetSize = getSize();

  const setClass = () => {
    node?.classList.add(`widget-size-${currentWidgetSize}`);
  };
  const removeClass = () => {
    node?.classList.remove(`widget-size-${currentWidgetSize}`);
  };

  setClass();

  const handleResize = () => {
    const newWidgetSize = getSize();
    if (newWidgetSize === currentWidgetSize) {
      return;
    }

    removeClass();
    currentWidgetSize = newWidgetSize;
    setClass();
  };

  handleResize();
  window.addEventListener('resize', handleResize);
};
