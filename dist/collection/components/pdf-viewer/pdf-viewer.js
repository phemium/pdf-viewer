import { h, getAssetPath, } from "@stencil/core";
import * as screenfull from "screenfull";
export class PdfViewer {
    constructor() {
        /** Listener del eventBus de PDF.js para descarga en Cordova. */
        this.boundHandleCordovaDownload = () => {
            void this.handleCordovaDownload();
        };
        this.src = undefined;
        this.file = undefined;
        this.page = undefined;
        this.enableToolbar = true;
        this.disableScrolling = false;
        this.enableManualFullscreenFallback = false;
        this.enableSideDrawer = true;
        this.enableSearch = true;
        this.enableAnnotationEditing = false;
        this.scale = undefined;
        this.iframeLoaded = undefined;
    }
    updateToolbarVisibility() {
        if (this.toolbarEl) {
            if (this.enableToolbar) {
                this.toolbarEl.classList.remove("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty("--toolbar-height", "");
            }
            else {
                this.toolbarEl.classList.add("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty("--toolbar-height", "0px");
            }
        }
    }
    updateScrolling() {
        if (this.viewerContainer) {
            if (this.disableScrolling) {
                this.viewerContainer.style.pointerEvents = "none";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "auto";
            }
            else {
                this.viewerContainer.style.pointerEvents = "";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "";
            }
        }
    }
    updateSideDrawerVisibility() {
        if (this.sidebarToggleEl) {
            if (this.enableSideDrawer) {
                this.sidebarToggleEl.classList.remove("hidden");
            }
            else {
                this.sidebarToggleEl.classList.add("hidden");
            }
        }
    }
    updateAnnotationEditingVisibility() {
        this.syncAnnotationEditingStyles();
    }
    updateSearchVisibility() {
        if (this.searchToggleEl) {
            if (this.enableSearch) {
                this.searchToggleEl.classList.remove("hidden");
            }
            else {
                this.searchToggleEl.classList.add("hidden");
            }
        }
    }
    print() {
        return new Promise((resolve) => {
            this.iframeEl.contentWindow.print();
            this.iframeEl.contentWindow.PDFViewerApplication.eventBus.on("afterprint", () => {
                resolve();
            }, { once: true });
        });
    }
    updateScale() {
        this.setScale(this.scale);
    }
    async setScale(scale) {
        const contentWindow = this.iframeEl.contentWindow;
        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = this.iframeEl.contentWindow
                .PDFViewerApplication;
            pdfViewer.currentScaleValue = scale;
        }
    }
    async getPage() {
        const contentWindow = this.iframeEl.contentWindow;
        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = this.iframeEl.contentWindow
                .PDFViewerApplication;
            return pdfViewer.currentPageNumber;
        }
    }
    get viewerSrc() {
        if (this.page) {
            return `${getAssetPath("./pdf-viewer-assets/viewer/web/viewer.html")}?file=${encodeURIComponent(this.src)}#page=${this.page}`;
        }
        return `${getAssetPath("./pdf-viewer-assets/viewer/web/viewer.html")}?file=${encodeURIComponent(this.src)}`;
    }
    componentWillLoad() {
        this.onWebViewerLoadedBound = this.onWebViewerLoaded.bind(this);
        document.addEventListener("webviewerloaded", this.onWebViewerLoadedBound);
    }
    /**
     * PDF.js dispara este evento en document antes de PDFViewerApplication.run;
     * así las opciones aplican a la primera carga del visor.
     */
    onWebViewerLoaded(ev) {
        var _a, _b;
        if (this.enableAnnotationEditing) {
            return;
        }
        const win = (_a = ev.detail) === null || _a === void 0 ? void 0 : _a.source;
        if (!win || win !== ((_b = this.iframeEl) === null || _b === void 0 ? void 0 : _b.contentWindow)) {
            return;
        }
        const appOpts = win.PDFViewerApplicationOptions;
        if (!(appOpts === null || appOpts === void 0 ? void 0 : appOpts.set)) {
            return;
        }
        // -1 = AnnotationEditorType.DISABLE (pdf.js)
        appOpts.set("annotationEditorMode", -1);
        appOpts.set("enableComment", false);
        appOpts.set("enableSignatureEditor", false);
    }
    componentDidLoad() {
        this.iframeEl.onload = () => {
            this.setCSSVariables();
            this.initButtonVisibility();
            this.addEventListeners();
            this.iframeLoaded = true;
            this.PDFViewerApplication = this.iframeEl.contentWindow.PDFViewerApplication;
        };
    }
    disconnectedCallback() {
        var _a, _b, _c, _d, _e;
        document.removeEventListener("webviewerloaded", this.onWebViewerLoadedBound);
        (_b = (_a = this.PDFViewerApplication) === null || _a === void 0 ? void 0 : _a.eventBus) === null || _b === void 0 ? void 0 : _b.off("download", this.boundHandleCordovaDownload);
        // https://github.com/mozilla/pdf.js/issues/11297
        (_e = (_d = (_c = this.PDFViewerApplication) === null || _c === void 0 ? void 0 : _c.pdfViewer) === null || _d === void 0 ? void 0 : _d._pages) === null || _e === void 0 ? void 0 : _e.forEach((page) => page.reset());
    }
    /** True cuando el visor corre dentro de una app Cordova (WebView). */
    isCordovaEnvironment() {
        var _a;
        const topWindow = ((_a = window.top) !== null && _a !== void 0 ? _a : window);
        return !!topWindow.cordova;
    }
    isHttpUrl(url) {
        return /^https?:\/\//i.test(url !== null && url !== void 0 ? url : "");
    }
    resolveDownloadFilename(app) {
        var _a, _b;
        const fromProp = (_a = this.file) === null || _a === void 0 ? void 0 : _a.trim();
        if (fromProp) {
            return fromProp;
        }
        const fromApp = app === null || app === void 0 ? void 0 : app._docFilename;
        if (typeof fromApp === "string" && fromApp.trim()) {
            return fromApp.trim();
        }
        const fromTitle = (_b = app === null || app === void 0 ? void 0 : app.documentInfo) === null || _b === void 0 ? void 0 : _b.Title;
        if (typeof fromTitle === "string" && fromTitle.trim()) {
            return `${fromTitle.trim()}.pdf`;
        }
        return "documento.pdf";
    }
    openExternalDownloadUrl(url) {
        var _a, _b;
        const topWindow = ((_a = window.top) !== null && _a !== void 0 ? _a : window);
        if ((_b = topWindow.cordova) === null || _b === void 0 ? void 0 : _b.InAppBrowser) {
            topWindow.cordova.InAppBrowser.open(url, "_system", "location=yes");
            return;
        }
        window.open(url, "_system");
    }
    postMessageToHost(payload) {
        var _a;
        const targetWindow = (_a = window.top) !== null && _a !== void 0 ? _a : window;
        targetWindow.postMessage(payload, "*");
    }
    async getPdfBlobAndFilename() {
        var _a, _b;
        const frameWindow = (_a = this.iframeEl) === null || _a === void 0 ? void 0 : _a.contentWindow;
        const app = frameWindow === null || frameWindow === void 0 ? void 0 : frameWindow.PDFViewerApplication;
        if (!app) {
            return null;
        }
        let data;
        try {
            data = await (app.pdfDocument
                ? app.pdfDocument.getData()
                : (_b = app.pdfLoadingTask) === null || _b === void 0 ? void 0 : _b.getData());
        }
        catch (error) {
            console.error("phemium-pdf-viewer: error obteniendo bytes del PDF", error);
            return null;
        }
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            return null;
        }
        return {
            blob: new Blob([data], { type: "application/pdf" }),
            filename: this.resolveDownloadFilename(app),
        };
    }
    /**
     * En Cordova el DownloadManager de PDF.js (<a download>) no funciona en WebView.
     * Para URLs HTTP(S) abrimos el documento en el navegador del sistema; para data:/blob
     * enviamos el PDF al host vía postMessage para guardarlo con cordova-plugin-file.
     */
    async handleCordovaDownload() {
        if (!this.isCordovaEnvironment()) {
            return;
        }
        if (this.isHttpUrl(this.src)) {
            this.openExternalDownloadUrl(this.src);
            return;
        }
        const pdfPayload = await this.getPdfBlobAndFilename();
        if (!pdfPayload) {
            return;
        }
        this.postMessageToHost({
            blob: pdfPayload.blob,
            filename: pdfPayload.filename,
        });
    }
    setCSSVariables() {
        for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
            const value = getComputedStyle(this.element).getPropertyValue(PdfViewer.CSSVariables[i]);
            this.iframeEl.contentDocument.documentElement.style.setProperty(PdfViewer.CSSVariables[i], value);
        }
    }
    /**
     * Refuerzo por CSS dentro del iframe: oculta #editorModeButtons y el separador asociado.
     * PDF.js puede volver a mostrar el grupo vía clases; !important mantiene el bloque oculto.
     */
    syncAnnotationEditingStyles() {
        var _a;
        const doc = (_a = this.iframeEl) === null || _a === void 0 ? void 0 : _a.contentDocument;
        if (!doc) {
            return;
        }
        const existing = doc.getElementById(PdfViewer.ANNOTATION_HIDE_STYLE_ID);
        if (this.enableAnnotationEditing) {
            existing === null || existing === void 0 ? void 0 : existing.remove();
            return;
        }
        if (existing) {
            return;
        }
        const style = doc.createElement("style");
        style.id = PdfViewer.ANNOTATION_HIDE_STYLE_ID;
        style.textContent = `
#editorModeButtons,
#editorModeSeparator {
  display: none !important;
}
`.trim();
        doc.head.appendChild(style);
    }
    /**
     * Oculta vía CSS los botones Abrir e Imprimir del visor embebido.
     * Se inyecta una sola vez; el elemento permanece en el DOM para que PDF.js
     * registre sus listeners sin errores.
     */
    syncEmbeddedHideStyles() {
        var _a;
        const doc = (_a = this.iframeEl) === null || _a === void 0 ? void 0 : _a.contentDocument;
        if (!doc || doc.getElementById(PdfViewer.EMBEDDED_HIDE_STYLE_ID)) {
            return;
        }
        const style = doc.createElement("style");
        style.id = PdfViewer.EMBEDDED_HIDE_STYLE_ID;
        style.textContent = `
#printButton,
#secondaryOpenFile,
#secondaryPrint {
  display: none !important;
}
`.trim();
        doc.head.appendChild(style);
    }
    /**
     * Tipografía de los botones de la barra del visor (clase .toolbarButton de PDF.js).
     */
    syncToolbarButtonFontStyle() {
        var _a;
        const doc = (_a = this.iframeEl) === null || _a === void 0 ? void 0 : _a.contentDocument;
        if (!doc) {
            return;
        }
        if (doc.getElementById(PdfViewer.TOOLBAR_BUTTON_FONT_STYLE_ID)) {
            return;
        }
        const style = doc.createElement("style");
        style.id = PdfViewer.TOOLBAR_BUTTON_FONT_STYLE_ID;
        style.textContent = `
.toolbarButton {
  font-size: 13px !important;
}
`.trim();
        doc.head.appendChild(style);
    }
    initButtonVisibility() {
        this.toolbarEl =
            this.iframeEl.contentDocument.body.querySelector("#toolbarContainer");
        this.sidebarToggleEl =
            this.iframeEl.contentDocument.body.querySelector("#sidebarToggle");
        this.searchToggleEl =
            this.iframeEl.contentDocument.body.querySelector("#viewFind");
        this.updateToolbarVisibility();
        this.updateSideDrawerVisibility();
        this.updateSearchVisibility();
        this.syncAnnotationEditingStyles();
        this.syncEmbeddedHideStyles();
        this.syncToolbarButtonFontStyle();
    }
    addEventListeners() {
        this.viewerContainer =
            this.iframeEl.contentDocument.body.querySelector("#viewerContainer");
        const frameWindow = this.iframeEl.contentWindow;
        const pdfViewer = frameWindow.PDFViewerApplication;
        pdfViewer.initializedPromise.then(() => {
            // Por si PDF.js altera la barra tras el arranque; el estilo inyectado sigue aplicando.
            this.syncAnnotationEditingStyles();
            this.syncEmbeddedHideStyles();
            this.syncToolbarButtonFontStyle();
            pdfViewer.eventBus.on("pagechanging", this.handlePageChange.bind(this));
            // when the documents within the pdf viewer finish loading
            pdfViewer.eventBus.on("pagesloaded", () => {
                this.syncAnnotationEditingStyles();
                this.syncEmbeddedHideStyles();
                this.syncToolbarButtonFontStyle();
                if (this.scale) {
                    this.setScale(this.scale);
                }
            });
            if (this.isCordovaEnvironment()) {
                pdfViewer.eventBus.on("download", this.boundHandleCordovaDownload);
            }
        });
        this.viewerContainer.addEventListener("click", this.handleLinkClick.bind(this));
        this.updateScrolling();
        const fullscreenBtn = this.iframeEl.contentDocument.documentElement.querySelector("#fullscreen");
        const collapseIcon = fullscreenBtn === null || fullscreenBtn === void 0 ? void 0 : fullscreenBtn.querySelector("#collapseIcon");
        const fullscreenIcon = fullscreenBtn === null || fullscreenBtn === void 0 ? void 0 : fullscreenBtn.querySelector("#fullscreenIcon");
        if (screenfull.isEnabled) {
            screenfull.on("change", () => {
                if (screenfull.isEnabled) {
                    if (screenfull.isFullscreen) {
                        collapseIcon.classList.remove("hidden");
                        fullscreenIcon.classList.add("hidden");
                    }
                    else {
                        fullscreenIcon.classList.remove("hidden");
                        collapseIcon.classList.add("hidden");
                    }
                }
            });
            fullscreenBtn === null || fullscreenBtn === void 0 ? void 0 : fullscreenBtn.addEventListener("click", () => {
                if (screenfull.isEnabled) {
                    screenfull.toggle(this.iframeEl.contentDocument.documentElement);
                }
            });
        }
        else if (this.enableManualFullscreenFallback) {
            // enable "fake" fullscreen
            let isFullscreen = false;
            fullscreenBtn.classList.remove("hidden");
            fullscreenBtn.addEventListener("click", () => {
                if (isFullscreen) {
                    isFullscreen = false;
                    collapseIcon.classList.add("hidden");
                    fullscreenIcon.classList.remove("hidden");
                }
                else {
                    isFullscreen = true;
                    collapseIcon.classList.remove("hidden");
                    fullscreenIcon.classList.add("hidden");
                }
                this.fullscreenToggle.emit(isFullscreen);
            });
        }
    }
    handlePageChange(e) {
        this.pageChange.emit(e.pageNumber);
    }
    handleLinkClick(e) {
        e.preventDefault();
        const link = e.target.tagName === "A"
            ? e.target
            : e.target.closest(".linkAnnotation > a");
        if (link) {
            // Ignore internal links to the same document
            if (link.classList.contains("internalLink")) {
                return;
            }
            const href = link.href || "";
            this.linkClick.emit(href);
        }
    }
    render() {
        return (h("iframe", { key: '24ac02f5175489405c44320e229907ae709f6ca6', class: {
                loaded: this.iframeLoaded,
            }, ref: (el) => (this.iframeEl = el), src: this.viewerSrc }));
    }
    static get is() { return "phemium-pdf-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["pdf-viewer.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["pdf-viewer.css"]
        };
    }
    static get assetsDirs() { return ["pdf-viewer-assets"]; }
    static get properties() {
        return {
            "src": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "src",
                "reflect": false
            },
            "file": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Nombre de archivo sugerido para la descarga en Cordova (atributo file del host)."
                },
                "attribute": "file",
                "reflect": false
            },
            "page": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "page",
                "reflect": false
            },
            "enableToolbar": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "enable-toolbar",
                "reflect": false,
                "defaultValue": "true"
            },
            "disableScrolling": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "disable-scrolling",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableManualFullscreenFallback": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "enable-manual-fullscreen-fallback",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableSideDrawer": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "enable-side-drawer",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSearch": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "enable-search",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableAnnotationEditing": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Si es false, desactiva herramientas de edici\u00F3n (resaltado, texto, tinta, etc.),\ncomentarios y firma en la barra del visor PDF.js."
                },
                "attribute": "enable-annotation-editing",
                "reflect": false,
                "defaultValue": "false"
            },
            "scale": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "\"auto\" | \"page-fit\" | \"page-width\" | number",
                    "resolved": "\"auto\" | \"page-fit\" | \"page-width\" | number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "scale",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "iframeLoaded": {}
        };
    }
    static get events() {
        return [{
                "method": "pageChange",
                "name": "pageChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                }
            }, {
                "method": "linkClick",
                "name": "linkClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "fullscreenToggle",
                "name": "fullscreenToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "print": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "setScale": {
                "complexType": {
                    "signature": "(scale: \"auto\" | \"page-fit\" | \"page-width\" | number) => Promise<void>",
                    "parameters": [{
                            "name": "scale",
                            "type": "number | \"auto\" | \"page-fit\" | \"page-width\"",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "getPage": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "element"; }
    static get watchers() {
        return [{
                "propName": "enableToolbar",
                "methodName": "updateToolbarVisibility"
            }, {
                "propName": "disableScrolling",
                "methodName": "updateScrolling"
            }, {
                "propName": "enableSideDrawer",
                "methodName": "updateSideDrawerVisibility"
            }, {
                "propName": "enableAnnotationEditing",
                "methodName": "updateAnnotationEditingVisibility"
            }, {
                "propName": "enableSearch",
                "methodName": "updateSearchVisibility"
            }, {
                "propName": "scale",
                "methodName": "updateScale"
            }];
    }
}
/** id del <style> inyectado en el iframe para ocultar la barra de anotaciones */
PdfViewer.ANNOTATION_HIDE_STYLE_ID = "phemium-pdf-viewer-hide-editor-toolbar";
/** id del <style> para tamaño de fuente de botones de barra en PDF.js */
PdfViewer.TOOLBAR_BUTTON_FONT_STYLE_ID = "phemium-pdf-viewer-toolbar-button-font";
/** id del <style> que oculta botones Abrir e Imprimir no aplicables en visor embebido */
PdfViewer.EMBEDDED_HIDE_STYLE_ID = "phemium-pdf-viewer-embedded-hide";
PdfViewer.CSSVariables = [
    "--pdf-viewer-top-offset",
    "--pdf-viewer-bottom-offset",
    "--background-color",
    "--toolbar-background-color",
    "--border-color",
    "--icon-color",
    "--accent-color",
    "--page-border-radius",
    "--page-box-shadow",
    "--page-margin",
    "--floating-buttons-offset",
];
//# sourceMappingURL=pdf-viewer.js.map
