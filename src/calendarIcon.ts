export const getCalenderIcon = (color?: string) => {
  const xmlns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttributeNS(null, 'class', 'calendar');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttributeNS(null, 'fill', color || '4990e2');

  svg.appendChild(path);
  return svg;
};
