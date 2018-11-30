/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  PDFSource,
} from 'pdfjs-dist';


export namespace Components {

  interface HivePdfViewer {
    'allowPrint': boolean;
    'canAutoResize': boolean;
    'currentMatchIndex': number;
    'enableRotate': boolean;
    'enableSearch': boolean;
    'enableSideDrawer': boolean;
    'externalLinkTarget': string;
    'fitToPage': boolean;
    'maxZoom': number;
    'minZoom': number;
    'openDrawer': boolean;
    'originalSize': boolean;
    'page': number;
    'renderText': boolean;
    'rotation': number;
    'searchOpen': boolean;
    'src': string | Uint8Array | PDFSource;
    'stickToPage': boolean;
    'totalMatchCount': number;
    'zoom': number;
  }
  interface HivePdfViewerAttributes extends StencilHTMLAttributes {
    'allowPrint'?: boolean;
    'canAutoResize'?: boolean;
    'currentMatchIndex'?: number;
    'enableRotate'?: boolean;
    'enableSearch'?: boolean;
    'enableSideDrawer'?: boolean;
    'externalLinkTarget'?: string;
    'fitToPage'?: boolean;
    'maxZoom'?: number;
    'minZoom'?: number;
    'onAfterLoadComplete'?: (event: CustomEvent) => void;
    'onOnError'?: (event: CustomEvent) => void;
    'onOnLinkClick'?: (event: CustomEvent) => void;
    'onOnProgress'?: (event: CustomEvent) => void;
    'onPageChange'?: (event: CustomEvent) => void;
    'openDrawer'?: boolean;
    'originalSize'?: boolean;
    'page'?: number;
    'renderText'?: boolean;
    'rotation'?: number;
    'searchOpen'?: boolean;
    'src'?: string | Uint8Array | PDFSource;
    'stickToPage'?: boolean;
    'totalMatchCount'?: number;
    'zoom'?: number;
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


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
