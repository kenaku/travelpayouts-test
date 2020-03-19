import { render, h } from 'preact';
import { useRef } from 'preact/hooks';
import './widget.css';

import { useWidgetSize } from './useWidgetSize';

import { setWidgetCustomStyles } from './utils/customStyles';
import { SearchForm } from './SearchForm';

const container = document.currentScript?.parentElement;

if (container) {
  const Widget = () => {
    const widgetSize = useWidgetSize(container);
    const widgetRoot = useRef<HTMLDivElement>(null);

    return (
      <section className="slowpoke_tp_widget" ref={widgetRoot}>
        <div
          className={`widget widget-size-${widgetSize}`}
          ref={setWidgetCustomStyles}
        >
          <h3 className="title">Where does it come from? Why do we use it?</h3>
          <div className="note">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </div>
          <SearchForm widgetRoot={widgetRoot} />
        </div>
      </section>
    );
  };
  render(<Widget />, container);
}
