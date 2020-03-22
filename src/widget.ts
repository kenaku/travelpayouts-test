import './styles/widget.css';

import { searchForm } from './searchForm';
import { syncWidgetSize } from './utils/syncWidgetSize';
import { getCustomStyles } from './utils/customStyles';
import { h } from './utils/h';

const container = document.currentScript?.parentElement;

if (container) {
  const widget = () => {
    const customBG = getCustomStyles('widget-background');
    const customColor = getCustomStyles('widget-color');
    const customStylesString = `background:${customBG}; color:${customColor};`;

    const titleContent = 'Where does it come from? Why do we use it?';
    const noteContent =
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';

    const title = h('h3', { class: 'title' }, titleContent);
    const note = h('div', { class: 'note' }, noteContent);

    const widgetRoot = h('section', {
      class: 'slowpoke_tp_widget',
    });

    const widget = h(
      'div',
      { class: 'widget', style: customStylesString },
      title,
      note,
      searchForm(widgetRoot),
    );

    widgetRoot.appendChild(widget);
    container.appendChild(widgetRoot);

    syncWidgetSize(container);
  };

  widget();
}
