/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface HivePdfViewer {
    'enableSearch': boolean;
    'enableSideDrawer': boolean;
    'enableToolbar': boolean;
    'page': number;
    'print': () => Promise<void>;
    'scale': 'auto' | 'page-fit' | 'page-width' | number;
    'setScale': (scale: number | "auto" | "page-fit" | "page-width") => void;
    'src': string;
  }
  interface HivePdfViewerAttributes extends StencilHTMLAttributes {
    'enableSearch'?: boolean;
    'enableSideDrawer'?: boolean;
    'enableToolbar'?: boolean;
    'onOnLinkClick'?: (event: CustomEvent<string>) => void;
    'onPageChange'?: (event: CustomEvent<number>) => void;
    'page'?: number;
    'scale'?: 'auto' | 'page-fit' | 'page-width' | number;
    'src'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'HivePdfViewer': Components.HivePdfViewer;
  }

  interface StencilIntrinsicElements {
    'hive-pdf-viewer': Components.HivePdfViewerAttributes;
  }


  interface HTMLHivePdfViewerElement extends Components.HivePdfViewer, HTMLStencilElement {}
  var HTMLHivePdfViewerElement: {
    prototype: HTMLHivePdfViewerElement;
    new (): HTMLHivePdfViewerElement;
  };

  interface HTMLElementTagNameMap {
    'hive-pdf-viewer': HTMLHivePdfViewerElement
  }

  interface ElementTagNameMap {
    'hive-pdf-viewer': HTMLHivePdfViewerElement;
  }


}
