import { h, getAssetPath, } from "@stencil/core";
import * as screenfull from "screenfull";
export class PdfViewer {
    constructor() {
        this.src = undefined;
        this.page = undefined;
        this.enableToolbar = true;
        this.disableScrolling = false;
        this.enableManualFullscreenFallback = false;
        this.enableSideDrawer = true;
        this.enableSearch = true;
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
        // https://github.com/mozilla/pdf.js/issues/11297
        this.PDFViewerApplication.pdfViewer._pages.forEach((page) => page.reset());
    }
    setCSSVariables() {
        for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
            const value = getComputedStyle(this.element).getPropertyValue(PdfViewer.CSSVariables[i]);
            this.iframeEl.contentDocument.documentElement.style.setProperty(PdfViewer.CSSVariables[i], value);
        }
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
    }
    addEventListeners() {
        this.viewerContainer =
            this.iframeEl.contentDocument.body.querySelector("#viewerContainer");
        const frameWindow = this.iframeEl.contentWindow;
        const pdfViewer = frameWindow.PDFViewerApplication;
        pdfViewer.initializedPromise.then(() => {
            pdfViewer.eventBus.on("pagechanging", this.handlePageChange.bind(this));
            // when the documents within the pdf viewer finish loading
            pdfViewer.eventBus.on("pagesloaded", () => {
                if (this.scale) {
                    this.setScale(this.scale);
                }
            });
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
        return (h("iframe", { key: '60fb4e79beb354f5fafe62d578707850ab582944', class: {
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
                "propName": "enableSearch",
                "methodName": "updateSearchVisibility"
            }, {
                "propName": "scale",
                "methodName": "updateScale"
            }];
    }
}
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
