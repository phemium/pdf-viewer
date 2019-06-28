![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Hive PDF Viewer

This web component allows you to add PDF rendering support to your web applications.

## Features
- Rendering PDFs on web (Angular, Ionic, React, Stencil, etc.)
- Search
- Fit to Page / Fit to Width
- Side panel for quick thumbnail navigation

## Installation for development
- `npm i`
- `git submodule update --init --recursive`
- `cd pdf.js && npm i`

## Production Build
- `npm run build`

## Usage

```bash
 npm i https://github.com/phemium/pdf-viewer
```

Somewhere in your project (e.g. `main.ts`):
```
import { defineCustomElements } from '@phemium/pdf-viewer/dist/loader';
defineCustomElements(window);
```

```
<hive-pdf-viewer src="http://www.mydomain.com/example.pdf"></hive-pdf-viewer>
```

### Angular

Add viewer assets to `angular.json` assets block:
```
{
    "projects": {
        "app": {
            "architect": {
                "build": {
                    "options": {
                        "assets": [
                            {
                                "glob": "**/*",
                                "input": "node_modules/@phemium/pdf-viewer/dist/pdf-viewer/pdf-viewer-assets",
                                "output": "pdf-viewer-assets"
                            }
```

Follow the [Stencil JS Framework Integration](https://stenciljs.com/docs/overview) guide for more info.

## Properties
|Property|Default|Description
:---:|:---:|:---:
|`src`||The PDF web address location (http, https)|
|`page`|`1`|The default page index.|
|`enableToolbar`|`true`|If the toolbar is available for display.|
|`enableSideDrawer`|`true`|If the side drawer UI (and button) is available for display.|
|`enableSearch`|`true`|If the document can be searched through. Hides the button when false.|

### Events
|Event|Description|
:---:|:---:
|`onLinkClick(href: string)`|Emits the `href` clicked when it's not an internal document annotation.|
|`pageChange(currentPage: number)`|Emits the current page number when the current page changes.|

---
