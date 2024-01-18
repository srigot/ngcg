# Ngcg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Installation
### CLI

Il faut installer les clients suivants :
* @angular/cli : `npm i -g @angular/cli`
* firebasee : `npm i -g firebase-tools`
* Créer le fichier `src/environment/firebase.ts` en ajoutant les infos dans la console firebase + clientId de la console Google
  * Modifier le `domainAuth` par le nom de domaine utilisé.

### Charger les dépendances

`npm i`
Attention, des erreurs des builds avec Node 12

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

## Déploiement

Run `ng deploy` pour déployer sur Firebase Hosting
