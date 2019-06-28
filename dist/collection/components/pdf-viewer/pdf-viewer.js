export class PdfViewer {
    constructor() {
        this.enableToolbar = true;
        this.enableSideDrawer = true;
        this.enableSearch = true;
    }
    updateToolbarVisibility() {
        if (this.toolbarEl) {
            if (this.enableToolbar) {
                this.toolbarEl.classList.remove('hidden');
            }
            else {
                this.toolbarEl.classList.add('hidden');
                this.iframeEl.contentDocument.documentElement.style.setProperty('--toolbar-height', '0px');
            }
        }
    }
    updateSideDrawerVisibility() {
        if (this.sidebarToggleEl) {
            if (this.enableSideDrawer) {
                this.sidebarToggleEl.classList.remove('hidden');
            }
            else {
                this.sidebarToggleEl.classList.add('hidden');
            }
        }
    }
    updateSearchVisibility() {
        if (this.searchToggleEl) {
            if (this.enableSearch) {
                this.searchToggleEl.classList.remove('hidden');
            }
            else {
                this.searchToggleEl.classList.add('hidden');
            }
        }
    }
    print() {
        return new Promise((resolve) => {
            this.iframeEl.contentWindow.print();
            this.iframeEl.contentWindow.addEventListener('afterprint', () => {
                resolve();
            }, { once: true });
        });
    }
    updateScale() {
        this.setScale(this.scale);
    }
    setScale(scale) {
        const contentWindow = this.iframeEl.contentWindow;
        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = this.iframeEl.contentWindow.PDFViewerApplication;
            pdfViewer.currentScaleValue = scale;
        }
    }
    get viewerSrc() {
        if (this.page) {
            return `${this.resourcesUrl}pdf-viewer-assets/viewer/web/viewer.html?file=${encodeURIComponent(this.src)}#page=${this.page}`;
        }
        return `${this.resourcesUrl}pdf-viewer-assets/viewer/web/viewer.html?file=${encodeURIComponent(this.src)}`;
    }
    componentDidLoad() {
        this.iframeEl.onload = () => {
            this.setCSSVariables();
            this.initButtonVisibility();
            this.addEventListeners();
            this.iframeLoaded = true;
        };
    }
    setCSSVariables() {
        for (let i = 0; i < PdfViewer.CSSVariables.length; i++) {
            const value = getComputedStyle(this.element).getPropertyValue(PdfViewer.CSSVariables[i]);
            this.iframeEl.contentDocument.documentElement.style.setProperty(PdfViewer.CSSVariables[i], value);
        }
    }
    initButtonVisibility() {
        this.toolbarEl = this.iframeEl.contentDocument.body.querySelector('#toolbarContainer');
        this.sidebarToggleEl = this.iframeEl.contentDocument.body.querySelector('#sidebarToggle');
        this.searchToggleEl = this.iframeEl.contentDocument.body.querySelector('#viewFind');
        this.updateToolbarVisibility();
        this.updateSideDrawerVisibility();
        this.updateSearchVisibility();
    }
    addEventListeners() {
        this.viewerContainer = this.iframeEl.contentDocument.body.querySelector('#viewerContainer');
        this.viewerContainer.addEventListener('pagechange', this.handlePageChange.bind(this));
        this.viewerContainer.addEventListener('click', this.handleLinkClick.bind(this));
        this.iframeEl.contentDocument.addEventListener('pagesloaded', () => {
            if (this.scale) {
                this.setScale(this.scale);
            }
        });
    }
    handlePageChange(e) {
        this.pageChange.emit(e.pageNumber);
    }
    handleLinkClick(e) {
        e.preventDefault();
        const link = e.target.closest('.linkAnnotation > a');
        if (link) {
            if (link.classList.contains('internalLink')) {
                return;
            }
            const href = e.target.closest('.linkAnnotation > a').href || '';
            this.onLinkClick.emit(href);
        }
    }
    render() {
        return h("iframe", { class: this.iframeLoaded ? 'loaded' : '', ref: (el) => this.iframeEl = el, src: this.viewerSrc });
    }
    static get is() { return "hive-pdf-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "element": {
            "elementRef": true
        },
        "enableSearch": {
            "type": Boolean,
            "attr": "enable-search",
            "watchCallbacks": ["updateSearchVisibility"]
        },
        "enableSideDrawer": {
            "type": Boolean,
            "attr": "enable-side-drawer",
            "watchCallbacks": ["updateSideDrawerVisibility"]
        },
        "enableToolbar": {
            "type": Boolean,
            "attr": "enable-toolbar",
            "watchCallbacks": ["updateToolbarVisibility"]
        },
        "iframeLoaded": {
            "state": true
        },
        "page": {
            "type": Number,
            "attr": "page"
        },
        "print": {
            "method": true
        },
        "resourcesUrl": {
            "context": "resourcesUrl"
        },
        "scale": {
            "type": "Any",
            "attr": "scale",
            "watchCallbacks": ["updateScale"]
        },
        "setScale": {
            "method": true
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "window": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "pageChange",
            "method": "pageChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onLinkClick",
            "method": "onLinkClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:hive-pdf-viewer:**/"; }
}
PdfViewer.CSSVariables = [
    '--pdf-viewer-top-offset',
    '--pdf-viewer-bottom-offset'
];
