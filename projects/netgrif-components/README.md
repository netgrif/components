# Netgrif Components library

[![License](https://img.shields.io/badge/license-NETGRIF%20Community%20License-green)](https://netgrif.com/engine/license)
[![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/@netgrif/components/peer/@angular/core?color=red)](https://www.angular.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@netgrif/components)](https://www.npmjs.com/package/@netgrif/components)
[![npm](https://img.shields.io/npm/dt/@netgrif/components)](https://www.npmjs.com/package/@netgrif/components)
[![Petriflow 1.0.1](https://img.shields.io/badge/Petriflow-1.0.1-0aa8ff)](https://petriflow.com)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/netgrif/components?display_name=tag&sort=semver)](https://github.com/netgrif/components/releases)
[![build](https://github.com/netgrif/components/actions/workflows/master-build.yml/badge.svg)](https://github.com/netgrif/components/actions/workflows/master-build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=netgrif_components&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=netgrif_components)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=netgrif_components&metric=coverage)](https://sonarcloud.io/dashboard?id=netgrif_components)
[![Known Vulnerabilities](https://snyk.io/test/github/netgrif/components/badge.svg)](https://snyk.io/test/github/netgrif/components)

Netgrif Components library is an Angular library with set of web components that are default implementation of 
the components core library abstract components classes.
It is ready to use for creating SPA applications for NAE environment.

* Petriflow low-code language: [http://petriflow.com](https://petriflow.com)
* Documentation: [https://components.netgrif.com](https://components.netgrif.com)
<!-- * Getting Started: [https://components.netgrif.com/get_started](https://components.netgrif.com/get_started) -->
* Issue Tracker: [Github issues](https://github.com/netgrif/components/issues)
* Compodoc: [@netgrif/components compodoc](https://components.netgrif.com/#/compodoc/components)
* Typedoc: [@netgrif/components typedoc](https://components.netgrif.com/#/typedoc/components)
* License: [NETGRIF Community License](https://github.com/netgrif/components/blob/master/LICENSE)

The library consists of Angular web components implementing abstract component classes from @netgrif/components-core
library with html and scss files. Components' design is based on Material design by Google. The library uses services
and other utility classes from the core library.

## Requirements

The libraries are Angular libraries built on Angular Material (Material 3). They require:

| Name | Version |
|------|---------|
| [Node.js](https://nodejs.org) | 22.22+ or 24.15+ |
| [Angular](https://angular.dev) | 22 |
| [TypeScript](https://www.typescriptlang.org) | 6.0 |

The libraries have peer dependencies that are not installed automatically with npm. You can install them with this command:

```shell
npm i -S @angular/animations@"~22.2.3" @angular/cdk@"~22.2.4" @angular/common@"~22.2.3" @angular/compiler@"~22.2.3" @angular/core@"~22.2.3" @angular/forms@"~22.2.3" @angular/material@"~22.2.4" @angular/material-moment-adapter@"~22.2.4" @angular/platform-browser@"~22.2.3" @angular/platform-browser-dynamic@"~22.2.3" @angular/router@"~22.2.3" @material/material-color-utilities@"^0.4.0" @netgrif/petri.svg@"1.1.1" @netgrif/petriflow@"2.2.4" @netgrif/petriflow.svg@"1.1.1" @ngbracket/ngx-layout@"^22.0.2" @ngx-translate/core@"~15.0.0" @ngx-translate/http-loader@"~8.0.0" @panzoom/panzoom@"~4.5.1" @swimlane/ngx-charts@"^25.0.3" angular-gridster2@"~22.0.0" angular-resizable-element@"^8.0.3" angular2-hotkeys@"~16.0.0" antlr4ng@"^3.0.16" easymde@"~2.16.1" escape-string-regexp@"^4.0.0" hammerjs@"~2.0.8" jszip@"~3.2.2" marked@"~4.0.12" moment@"~2.29.4" monaco-editor@"^0.56.0" natural-orderby@"~2.0.3" ngx-monaco-editor-v2@"^22.0.5" ngx-quill@"^31.0.1" quill@"^2.0.0" rxjs@"~7.8.1" semver@"^7.6.0" xml-formatter@"^3.6.2" zone.js@"~0.15.1"
```

## Installation

To install complete NAE frontend experience you must install the core library and components library:

```shell
npm i -S @netgrif/components-core @netgrif/components
```

If you want to develop own set of NAE components, just install the core library, and you can start developing.

## Theming

The components use the Material 3 system tokens (`--mat-sys-*`). Include the theme of the library in the global stylesheet of the application:

```scss
@use '@netgrif/components/theming' as nae;

@include nae.theme();                                    // Netgrif brand palettes
// @include nae.theme($primary: my.$primary-palette);    // own palettes from `ng generate @angular/material:theme-color`
```

The theme is required, Material 2 themes (`nae-lib-theme()`, `mat.m2-*`) are not supported. Besides the system tokens
it emits the few global state classes the components rely on (case color, active indicator, builder canvas states).

and provide the Material defaults the design is built for:

```typescript
providers: [provideNaeMaterialDefaults({iconFontSet: 'material-symbols-rounded'})]
```

Dashboard chart cards use `@swimlane/ngx-charts`, which still needs `provideAnimationsAsync()` from `@angular/platform-browser/animations/async`.

## Usage and configuration

To start building your NAE web application, it must be configured as Angular application and as NAE application as well.

Firstly, create new Angular project. We recommend following [official guide](https://angular.io/guide/setup-local).


If you want to create own library of components for NAE applications, please see the library [@netgrif/components-core](https://github.com/netgrif/components/blob/master/projects/netgrif-components-core/README.md).

### NAE.json

To configure NAE application more easily the libraries use file nae.json that is placed in root of the project.
nae.json defines global application configuration like urls to backend resources, services' configurations, routing and views.

You can find [minimal nae.json configuration here](docs/configuration/nae-minimal.json).

<!-- You can read more on how to configure complete [nae.json here](https://components.netgrif.com/#/configuration). -->


For easier startup clone [template project for NAE frontend application](https://github.com/netgrif/nae-frontend-application-starter)

<!-- For more information please read instructions in [Get Started](https://components.netgrif.com/#/get_started) -->

## Other projects

### Application Engine

[Netgrif Application Engine](https://github.com/netgrif/application-engine) is workflow management system powered by low-code language Petriflow written in Java.
Application Engine can run as a standalone java application, as a docker image, or you can embed it to your Java/Spring Boot project.

### Application Builder

For creating processes in Petriflow language try our free Application Builder on [https://builder.netgrif.com](https://builder.netgrif.com).
You can start from scratch or import existing process in BPMN 2.0 and builder automatically converts it into Petriflow.

### NCLI (Coming soon)

If you need help with setting up project or looking for tool to automate your developer work with NAE based applications,
take a look on [NCLI (Netgrif Command Line Interface)](https://github.com/netgrif/ncli).

## Reporting issues

If you find a bug, let us know at [Issue page](https://github.com/netgrif/components/issues). First, please read our [Contribution guide](https://github.com/netgrif/components/blob/master/CONTRIBUTING.md)

## License

The software is licensed under NETGRIF Community license. You may be found this license at [the LICENSE file](https://github.com/netgrif/components/blob/master/LICENSE) in the repository. 
