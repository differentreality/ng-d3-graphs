# NgD3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Git Workflow

* Install [Commitizen](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-changelog-generator) globally
* Install vscode plugin [changelog-generator](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-changelog-generator)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## How to Migrate d3.js graph into a component

### General Process
1. Understand the inputs of the graph
2. Specify the required input into objects
3. Define a clear API of the graph component
    * Input
    * Output (events)
4. Create an svg element at markup
5. Provide a unique id to svg to avoid conflicts
6. Transfer logic from graph into the component
7. Move pure functions to relevant service
