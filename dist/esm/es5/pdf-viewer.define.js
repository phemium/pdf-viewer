
// PdfViewer: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './pdf-viewer.core.js';
import { COMPONENTS } from './pdf-viewer.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
