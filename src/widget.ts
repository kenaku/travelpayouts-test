import './styles/widget.css';

import { searchForm } from './searchForm';
import { syncWidgetSize } from './utils/syncWidgetSize';
import { getCustomStyles } from './utils/customStyles';

const container = document.currentScript?.parentElement;

if (container) {
  const widget = () => {
    const customBG = getCustomStyles('widget-background') || '';
    const customColor = getCustomStyles('widget-color') || '';
    const customStylesString = `background:${customBG};color:${customColor};`;

    const widgetMarkup = `
      <div class="widget" style=${customStylesString}>
        <h3 class="title">Where does it come from? Why do we use it?</h3>
        <div class="note">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </div>
      </div>
    `;

    const widgetRoot = document.createElement('section');
    widgetRoot.classList.add('slowpoke_tp_widget');

    widgetRoot.innerHTML = widgetMarkup;
    container.appendChild(widgetRoot);

    const widget = container.querySelector('.widget');

    if (widgetRoot) {
      const form = searchForm(widgetRoot);
      widget?.appendChild(form);
    }
    syncWidgetSize(container);
  };

  widget();
}
