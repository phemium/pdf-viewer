import{h}from"../pdf-viewer.core.js";var PdfViewer=function(){function e(){this.enableToolbar=!0,this.enableSideDrawer=!0,this.enableSearch=!0}return e.prototype.updateToolbarVisibility=function(){this.toolbarEl&&(this.enableToolbar?this.toolbarEl.classList.remove("hidden"):(this.toolbarEl.classList.add("hidden"),this.iframeEl.contentDocument.documentElement.style.setProperty("--toolbar-height","0px")))},e.prototype.updateSideDrawerVisibility=function(){this.sidebarToggleEl&&(this.enableSideDrawer?this.sidebarToggleEl.classList.remove("hidden"):this.sidebarToggleEl.classList.add("hidden"))},e.prototype.updateSearchVisibility=function(){this.searchToggleEl&&(this.enableSearch?this.searchToggleEl.classList.remove("hidden"):this.searchToggleEl.classList.add("hidden"))},e.prototype.print=function(){var e=this;return new Promise(function(t){e.iframeEl.contentWindow.print(),e.iframeEl.contentWindow.addEventListener("afterprint",function(){t()},{once:!0})})},e.prototype.updateScale=function(){this.setScale(this.scale)},e.prototype.setScale=function(e){var t=this.iframeEl.contentWindow;t&&t.PDFViewerApplication&&(this.iframeEl.contentWindow.PDFViewerApplication.pdfViewer.currentScaleValue=e)},Object.defineProperty(e.prototype,"viewerSrc",{get:function(){return this.page?this.resourcesUrl+"pdf-viewer-assets/viewer/web/viewer.html?file="+encodeURIComponent(this.src)+"#page="+this.page:this.resourcesUrl+"pdf-viewer-assets/viewer/web/viewer.html?file="+encodeURIComponent(this.src)},enumerable:!0,configurable:!0}),e.prototype.componentDidLoad=function(){var e=this;this.iframeEl.onload=function(){e.setCSSVariables(),e.initButtonVisibility(),e.addEventListeners(),e.iframeLoaded=!0}},e.prototype.setCSSVariables=function(){for(var t=0;t<e.CSSVariables.length;t++){var i=getComputedStyle(this.element).getPropertyValue(e.CSSVariables[t]);this.iframeEl.contentDocument.documentElement.style.setProperty(e.CSSVariables[t],i)}},e.prototype.initButtonVisibility=function(){this.toolbarEl=this.iframeEl.contentDocument.body.querySelector("#toolbarContainer"),this.sidebarToggleEl=this.iframeEl.contentDocument.body.querySelector("#sidebarToggle"),this.searchToggleEl=this.iframeEl.contentDocument.body.querySelector("#viewFind"),this.updateToolbarVisibility(),this.updateSideDrawerVisibility(),this.updateSearchVisibility()},e.prototype.addEventListeners=function(){var e=this;this.viewerContainer=this.iframeEl.contentDocument.body.querySelector("#viewerContainer"),this.viewerContainer.addEventListener("pagechange",this.handlePageChange.bind(this)),this.viewerContainer.addEventListener("click",this.handleLinkClick.bind(this)),this.iframeEl.contentDocument.addEventListener("pagesloaded",function(){e.scale&&e.setScale(e.scale)})},e.prototype.handlePageChange=function(e){this.pageChange.emit(e.pageNumber)},e.prototype.handleLinkClick=function(e){e.preventDefault();var t=e.target.closest(".linkAnnotation > a");if(t){if(t.classList.contains("internalLink"))return;var i=e.target.closest(".linkAnnotation > a").href||"";this.onLinkClick.emit(i)}},e.prototype.render=function(){var e=this;return h("iframe",{class:this.iframeLoaded?"loaded":"",ref:function(t){return e.iframeEl=t},src:this.viewerSrc})},Object.defineProperty(e,"is",{get:function(){return"phemium-pdf-viewer"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{element:{elementRef:!0},enableSearch:{type:Boolean,attr:"enable-search",watchCallbacks:["updateSearchVisibility"]},enableSideDrawer:{type:Boolean,attr:"enable-side-drawer",watchCallbacks:["updateSideDrawerVisibility"]},enableToolbar:{type:Boolean,attr:"enable-toolbar",watchCallbacks:["updateToolbarVisibility"]},iframeLoaded:{state:!0},page:{type:Number,attr:"page"},print:{method:!0},resourcesUrl:{context:"resourcesUrl"},scale:{type:"Any",attr:"scale",watchCallbacks:["updateScale"]},setScale:{method:!0},src:{type:String,attr:"src"},window:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"pageChange",method:"pageChange",bubbles:!0,cancelable:!0,composed:!0},{name:"onLinkClick",method:"onLinkClick",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-phemium-pdf-viewer-h{--pdf-viewer-top-offset:0px;--pdf-viewer-bottom-offset:0px}.sc-phemium-pdf-viewer-h, iframe.sc-phemium-pdf-viewer{display:block;height:100%;width:100%}iframe.sc-phemium-pdf-viewer{border:none;visibility:hidden}iframe.loaded.sc-phemium-pdf-viewer{visibility:visible}"},enumerable:!0,configurable:!0}),e}();PdfViewer.CSSVariables=["--pdf-viewer-top-offset","--pdf-viewer-bottom-offset"];export{PdfViewer as PhemiumPdfViewer};