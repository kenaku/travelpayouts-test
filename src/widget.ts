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
      <section class="slowpoke_tp_widget">
        <div class="widget" style=${customStylesString}>
          <h3 class="title">Where does it come from? Why do we use it?</h3>
          <div class="note">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </div>
        </div>
      </section>
    `;

    container.innerHTML = widgetMarkup;

    const widgetRoot = container.querySelector('.slowpoke_tp_widget');
    const widget = container.querySelector('.widget');

    if (widgetRoot) {
      const form = searchForm(widgetRoot);
      widget?.appendChild(form);
    }
    syncWidgetSize(container);
  };

  widget();
}
