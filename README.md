# Netgrif Components libraries

[![License](https://img.shields.io/badge/license-NETGRIF%20Community%20License-green)](https://netgrif.com/engine/license)
[![Angular dependency](https://img.shields.io/npm/dependency-version/@netgrif/components-core/@angular/core?label=Angular)](https://www.angular.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@netgrif/components-core)](https://www.npmjs.com/package/@netgrif/components-core)
[![npm](https://img.shields.io/npm/dt/@netgrif/components-core)](https://www.npmjs.com/package/@netgrif/components-core)
[![Petriflow 1.0.1](https://img.shields.io/badge/Petriflow-1.0.1-0aa8ff)](https://petriflow.com)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/netgrif/components?sort=semver&display_name=tag)](https://github.com/netgrif/components/releases)
[![build](https://github.com/netgrif/components/actions/workflows/master-build.yml/badge.svg)](https://github.com/netgrif/components/actions/workflows/master-build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=netgrif_componentsmetric=alert_status)](https://sonarcloud.io/dashboard?id=netgrif_components)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=netgrif_components&metric=coverage)](https://sonarcloud.io/dashboard?id=netgrif_components)
[![Known Vulnerabilities](https://snyk.io/test/github/netgrif/components/badge.svg)](https://snyk.io/test/github/netgrif/components)

Netgrif Components is an Angular library for creating SPA (Single-page application) compatible with Netgrif Application Engine.
The library provides all necessary tools for creating refined frontend application into NAE environment,
and to create own library of Angular web components to incorporate your own personal design to the platform.

* Petriflow low-code language: [http://petriflow.com](https://petriflow.com)
* Documentation: [https://components.netgrif.com](https://components.netgrif.com)
<!-- * Getting Started: [https://components.netgrif.com/get_started](https://components.netgrif.com/get_started) -->
* Issue Tracker: [Github issues](https://github.com/netgrif/components/issues)
* Compodoc: [@netgrif/components compodoc](https://components.netgrif.com/#/compodoc/components), 
           [@netgrif/components-core compodoc](https://components.netgrif.com/#/compodoc/components-core)
* Typedoc: [@netgrif/components typedoc](https://components.netgrif.com/#/typedoc/components),
           [@netgrif/components-core typedoc](https://components.netgrif.com/#/typedoc/components-core)
* License: [NETGRIF Community License](https://github.com/netgrif/components/blob/master/LICENSE)

In this repository are 3 projects:
* [@netgrif/components-core](projects/netgrif-components-core/README.md) - Core library of services, factories and abstract classes of components.  
* [@netgrif/components](projects/netgrif-components/README.md) - Library of angular components implementing classes from core library.
* [Examples App](projects/nae-example-app/README.md) - Simple application to demonstrate and test individual components.

## Requirements

The Libraries are implemented as Angular libraries. With Angular dependencies there are several others to complement functionality and range of components available for
NAE based applications. The components library is based upon Angular Material components to make it easier to derived and implement own set of components but still keep
the functionality and compatibility with Application Engine.

The library has defined peer dependencies that are not installed automatically with npm. You can install dependencies with this command:

```shell
npm i -S @angular-material-components/datetime-picker@4 @angular-material-components/moment-adapter@4 @angular/animations@10 @angular/cdk@10 @angular/common@10 @angular/compiler@10 @angular/core@10 @angular/flex-layout@10 @angular/forms@10 @angular/material@10 @angular/material-moment-adapter@10 @angular/platform-browser@10 @angular/platform-browser-dynamic@10 @angular/router@10 @covalent/core@3 @covalent/highlight@3 @covalent/markdown@3 @covalent/text-editor@3 @ngx-translate/core@13 @ngx-translate/http-loader@6 @schematics/angular@10 angular-resizable-element@3 angular-resize-event@2 angular2-hotkeys@2 hammerjs@2 json-schema-to-typescript@8 jszip@3 moment@2 natural-orderby@2 rxjs@6 zone.js@0.10
```

## Installation

To install complete NAE frontend experience you must install the core library and components library:

```shell
npm i -S @netgrif/components-core @netgrif/components
```

If you want to developer own set of NAE components, just install the core library, and you can start developing.

## Usage and configuration

To start building your NAE web application, it must be configured as Angular application and as NAE application as well.

Firstly, create new Angular project. We recommend following [official guide](https://angular.io/guide/setup-local).
At the moment @netgrif/components does not support Ivy engine, your can turn it off with attribute in `tsconfig.json`:

```json
{
    "angularCompilerOptions":{
        "enableIvy": false
    }
}
```

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
