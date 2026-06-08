import {
    Component,
    Prop,
    Element,
    Event,
    EventEmitter,
    Watch,
    Method,
    State,
    h,
    getAssetPath,
    ComponentInterface,
} from "@stencil/core";
import * as screenfull from "screenfull";

@Component({
    tag: "phemium-pdf-viewer",
    styleUrl: "pdf-viewer.scss",
    shadow: true,
    assetsDirs: ["pdf-viewer-assets"],
})
export class PdfViewer implements ComponentInterface {
    /** id del <style> inyectado en el iframe para ocultar la barra de anotaciones */
    private static readonly ANNOTATION_HIDE_STYLE_ID =
        "phemium-pdf-viewer-hide-editor-toolbar";

    /** id del <style> para tamaño de fuente de botones de barra en PDF.js */
    private static readonly TOOLBAR_BUTTON_FONT_STYLE_ID =
        "phemium-pdf-viewer-toolbar-button-font";

    /** id del <style> que oculta botones Abrir e Imprimir no aplicables en visor embebido */
    private static readonly EMBEDDED_HIDE_STYLE_ID =
        "phemium-pdf-viewer-embedded-hide";

    static CSSVariables = [
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

    @Element() element: HTMLElement;

    @Prop() src: string;
    /** Nombre de archivo sugerido para la descarga en Cordova (atributo file del host). */
    @Prop() file: string;
    @Prop() page: number;

    @Prop() enableToolbar = true;
    toolbarEl: HTMLElement;

    @Watch("enableToolbar")
    updateToolbarVisibility() {
        if (this.toolbarEl) {
            if (this.enableToolbar) {
                this.toolbarEl.classList.remove("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty(
                    "--toolbar-height",
                    "",
                );
            } else {
                this.toolbarEl.classList.add("hidden");
                this.iframeEl.contentDocument.documentElement.style.setProperty(
                    "--toolbar-height",
                    "0px",
                );
            }
        }
    }

    @Prop() disableScrolling = false;

    @Prop() enableManualFullscreenFallback = false;

    @Watch("disableScrolling")
    updateScrolling() {
        if (this.viewerContainer) {
            if (this.disableScrolling) {
                this.viewerContainer.style.pointerEvents = "none";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "auto";
            } else {
                this.viewerContainer.style.pointerEvents = "";
                this.viewerContainer.style["WebkitOverflowScrolling"] = "";
            }
        }
    }

    @Prop() enableSideDrawer = true;
    sidebarToggleEl: HTMLElement;

    @Watch("enableSideDrawer")
    updateSideDrawerVisibility() {
        if (this.sidebarToggleEl) {
            if (this.enableSideDrawer) {
                this.sidebarToggleEl.classList.remove("hidden");
            } else {
                this.sidebarToggleEl.classList.add("hidden");
            }
        }
    }

    @Prop() enableSearch = true;
    searchToggleEl: HTMLElement;

    /**
     * Si es false, desactiva herramientas de edición (resaltado, texto, tinta, etc.),
     * comentarios y firma en la barra del visor PDF.js.
     */
    @Prop() enableAnnotationEditing = false;

    @Watch("enableAnnotationEditing")
    updateAnnotationEditingVisibility() {
        this.syncAnnotationEditingStyles();
    }

    @Watch("enableSearch")
    updateSearchVisibility() {
        if (this.searchToggleEl) {
            if (this.enableSearch) {
                this.searchToggleEl.classList.remove("hidden");
            } else {
                this.searchToggleEl.classList.add("hidden");
            }
        }
    }

    @Event() pageChange: EventEmitter<number>;
    @Event() linkClick: EventEmitter<string>;

    @Event() fullscreenToggle: EventEmitter<boolean>;

    @Method()
    print() {
        return new Promise<void>((resolve) => {
            this.iframeEl.contentWindow.print();
            (
                this.iframeEl.contentWindow as any
            ).PDFViewerApplication.eventBus.on(
                "afterprint",
                () => {
                    resolve();
                },
                { once: true },
            );
        });
    }

    @Prop() scale: "auto" | "page-fit" | "page-width" | number;

    @Watch("scale")
    updateScale() {
        this.setScale(this.scale);
    }

    @Method()
    async setScale(scale: "auto" | "page-fit" | "page-width" | number) {
        const contentWindow = this.iframeEl.contentWindow as any;

        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = (this.iframeEl.contentWindow as any)
                .PDFViewerApplication;
            pdfViewer.currentScaleValue = scale;
        }
    }

    @Method()
    async getPage() {
        const contentWindow = this.iframeEl.contentWindow as any;

        if (contentWindow && contentWindow.PDFViewerApplication) {
            const { pdfViewer } = (this.iframeEl.contentWindow as any)
                .PDFViewerApplication;
            return pdfViewer.currentPageNumber;
        }
    }

    iframeEl: HTMLIFrameElement;
    viewerContainer: HTMLElement;

    PDFViewerApplication: any;

    /** Referencia al manejador para poder eliminarlo al destruir el componente. */
    private onWebViewerLoadedBound: (ev: Event) => void;

    /** Listener del eventBus de PDF.js para descarga en Cordova. */
    private boundHandleCordovaDownload = () => {
        void this.handleCordovaDownload();
    };

    @State() iframeLoaded: boolean;

    get viewerSrc() {
        if (this.page) {
            return `${getAssetPath(
                "./pdf-viewer-assets/viewer/web/viewer.html",
            )}?file=${encodeURIComponent(this.src)}#page=${this.page}`;
        }
        return `${getAssetPath(
            "./pdf-viewer-assets/viewer/web/viewer.html",
        )}?file=${encodeURIComponent(this.src)}`;
    }

    componentWillLoad() {
        this.onWebViewerLoadedBound = this.onWebViewerLoaded.bind(this);
        document.addEventListener(
            "webviewerloaded",
            this.onWebViewerLoadedBound,
        );
    }

    /**
     * PDF.js dispara este evento en document antes de PDFViewerApplication.run;
     * así las opciones aplican a la primera carga del visor.
     */
    private onWebViewerLoaded(ev: Event) {
        if (this.enableAnnotationEditing) {
            return;
        }
        const win = (ev as CustomEvent<{ source?: Window }>).detail?.source;
        if (!win || win !== this.iframeEl?.contentWindow) {
            return;
        }
        const appOpts = (win as any).PDFViewerApplicationOptions;
        if (!appOpts?.set) {
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
            this.PDFViewerApplication = (
                this.iframeEl.contentWindow as any
            ).PDFViewerApplication;
        };
    }

    disconnectedCallback() {
        document.removeEventListener(
            "webviewerloaded",
            this.onWebViewerLoadedBound,
        );
        this.PDFViewerApplication?.eventBus?.off(
            "download",
            this.boundHandleCordovaDownload,
        );
        // https://github.com/mozilla/pdf.js/issues/11297
        this.PDFViewerApplication?.pdfViewer?._pages?.forEach((page: any) =>
            page.reset(),
        );
    }

    /** True cuando el visor corre dentro de una app Cordova (WebView). */
    private isCordovaEnvironment(): boolean {
        const topWindow = (window.top ?? window) as Window & {
            cordova?: unknown;
        };
        return !!topWindow.cordova;
    }

    private isHttpUrl(url: string): boolean {
        return /^https?:\/\//i.test(url ?? "");
    }

    private resolveDownloadFilename(app: any): string {
        const fromProp = this.file?.trim();
        if (fromProp) {
            return fromProp;
        }
        const fromApp = app?._docFilename;
        if (typeof fromApp === "string" && fromApp.trim()) {
            return fromApp.trim();
        }
        const fromTitle = app?.documentInfo?.Title;
        if (typeof fromTitle === "string" && fromTitle.trim()) {
            return `${fromTitle.trim()}.pdf`;
        }
        return "documento.pdf";
    }

    private openExternalDownloadUrl(url: string) {
        const topWindow = (window.top ?? window) as Window & {
            cordova?: { InAppBrowser?: { open: Function } };
        };

        if (topWindow.cordova?.InAppBrowser) {
            topWindow.cordova.InAppBrowser.open(
                url,
                "_system",
                "location=yes",
            );
            return;
        }

        window.open(url, "_system");
    }

    private postMessageToHost(payload: Record<string, unknown>) {
        const targetWindow = window.top ?? window;
        targetWindow.postMessage(payload, "*");
    }

    private async getPdfBlobAndFilename(): Promise<{
        blob: Blob;
        filename: string;
    } | null> {
        const frameWindow = this.iframeEl?.contentWindow as any;
        const app = frameWindow?.PDFViewerApplication;
        if (!app) {
            return null;
        }

        let data: Uint8Array | undefined;
        try {
            data = await (app.pdfDocument
                ? app.pdfDocument.getData()
                : app.pdfLoadingTask?.getData());
        } catch (error) {
            console.error(
                "phemium-pdf-viewer: error obteniendo bytes del PDF",
                error,
            );
            return null;
        }

        if (!data?.length) {
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
    private async handleCordovaDownload() {
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
            const value = getComputedStyle(this.element).getPropertyValue(
                PdfViewer.CSSVariables[i],
            );
            this.iframeEl.contentDocument.documentElement.style.setProperty(
                PdfViewer.CSSVariables[i],
                value,
            );
        }
    }

    /**
     * Refuerzo por CSS dentro del iframe: oculta #editorModeButtons y el separador asociado.
     * PDF.js puede volver a mostrar el grupo vía clases; !important mantiene el bloque oculto.
     */
    private syncAnnotationEditingStyles() {
        const doc = this.iframeEl?.contentDocument;
        if (!doc) {
            return;
        }
        const existing = doc.getElementById(PdfViewer.ANNOTATION_HIDE_STYLE_ID);
        if (this.enableAnnotationEditing) {
            existing?.remove();
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
    private syncEmbeddedHideStyles() {
        const doc = this.iframeEl?.contentDocument;
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
    private syncToolbarButtonFontStyle() {
        const doc = this.iframeEl?.contentDocument;
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
            this.iframeEl.contentDocument.body.querySelector(
                "#toolbarContainer",
            );
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
            this.iframeEl.contentDocument.body.querySelector(
                "#viewerContainer",
            );

        const frameWindow = this.iframeEl.contentWindow as any;
        const pdfViewer = frameWindow.PDFViewerApplication;

        pdfViewer.initializedPromise.then(() => {
            // Por si PDF.js altera la barra tras el arranque; el estilo inyectado sigue aplicando.
            this.syncAnnotationEditingStyles();
            this.syncEmbeddedHideStyles();
            this.syncToolbarButtonFontStyle();
            pdfViewer.eventBus.on(
                "pagechanging",
                this.handlePageChange.bind(this),
            );
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
                pdfViewer.eventBus.on(
                    "download",
                    this.boundHandleCordovaDownload,
                );
            }
        });

        this.viewerContainer.addEventListener(
            "click",
            this.handleLinkClick.bind(this),
        );

        this.updateScrolling();

        const fullscreenBtn =
            this.iframeEl.contentDocument.documentElement.querySelector(
                "#fullscreen",
            );

        const collapseIcon = fullscreenBtn?.querySelector(
            "#collapseIcon",
        ) as HTMLElement;

        const fullscreenIcon = fullscreenBtn?.querySelector(
            "#fullscreenIcon",
        ) as HTMLElement;

        if (screenfull.isEnabled) {
            screenfull.on("change", () => {
                if (screenfull.isEnabled) {
                    if (screenfull.isFullscreen) {
                        collapseIcon.classList.remove("hidden");
                        fullscreenIcon.classList.add("hidden");
                    } else {
                        fullscreenIcon.classList.remove("hidden");
                        collapseIcon.classList.add("hidden");
                    }
                }
            });

            fullscreenBtn?.addEventListener("click", () => {
                if (screenfull.isEnabled) {
                    screenfull.toggle(
                        this.iframeEl.contentDocument.documentElement,
                    );
                }
            });
        } else if (this.enableManualFullscreenFallback) {
            // enable "fake" fullscreen
            let isFullscreen = false;
            fullscreenBtn.classList.remove("hidden");

            fullscreenBtn.addEventListener("click", () => {
                if (isFullscreen) {
                    isFullscreen = false;
                    collapseIcon.classList.add("hidden");
                    fullscreenIcon.classList.remove("hidden");
                } else {
                    isFullscreen = true;
                    collapseIcon.classList.remove("hidden");
                    fullscreenIcon.classList.add("hidden");
                }
                this.fullscreenToggle.emit(isFullscreen);
            });
        }
    }

    handlePageChange(e: any) {
        this.pageChange.emit(e.pageNumber);
    }

    handleLinkClick(e: any) {
        e.preventDefault();
        const link =
            e.target.tagName === "A"
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
        return (
            <iframe
                class={{
                    loaded: this.iframeLoaded,
                }}
                ref={(el) => (this.iframeEl = el as HTMLIFrameElement)}
                src={this.viewerSrc}
            ></iframe>
        );
    }
}
