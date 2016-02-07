# sangu

**sangu** is a demo web app using [Sails](https://github.com/balderdashy/sails) and [Angular Material](https://github.com/angular/material). The purpose of this project is to understand how Sails and Angular can work together and how to structure the project.

Best practices and project organization has been in part inspired by [Minko Gechev's work](https://github.com/mgechev/angularjs-style-guide). I encourage you to read it.

## Test the app

Be sure to have NodeJS (v4.2 and above) and Sails.js (v0.11 and above) both installed on your computer.

- Clone the repo on your computer or download it as zip.
- Open your terminal and go to the project directory.
- Run `npm install`
- Run `sails lift`.
- Go to `http://localhost:1337` from your favorite web browser.


## Guide to build an app with Sails and Angular

### Table of content

<!-- TOC depthFrom:3 depthTo:6 withLinks:1 updateOnSave:0 orderedList:0 -->

- [Angular integration in a new Sails project](#angular-integration-in-a-new-sails-project)
	- [Create new Sails app](#create-new-sails-app)
	- [Link Angular Material's files to your main layout file](#link-angular-materials-files-to-your-main-layout-file)
	- [Create Angular's directories](#create-angulars-directories)
	- [Create the Angular app](#create-the-angular-app)
	- [Naming and location conventions](#naming-and-location-conventions)
	- [Controllers structure](#controllers-structure)
	- [Views management](#views-management)
	- [Run your app and enjoy :-)](#run-your-app-and-enjoy-)
- [Communication between Angular and Sails](#communication-between-angular-and-sails)

<!-- /TOC -->

### Angular integration in a new Sails project

You can replace in the guide the name _sangu_ by anything you want.

#### Create a new Sails app

`sails new sangu && cd sangu`

#### Link Angular Material's files to your main layout file
- The default main layout file is `views/layout.ejs`.

- Add these lines in the `<head>` part juste before the `<!--STYLES-->` tag to load the AngularMaterial CSS file and the MaterialDesignFont CSS file using Google's CDN.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/0.11.2/angular-material.min.css">
```

- Add these lines in the `<body>` part just before the `<!--SCRIPTS-->` tag to load the AngularJS and AngularJS Material JS files using Google's CDN.


```html
<!-- Angular Material Dependencies -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js"></script>
    <!-- Angular Material Javascript now available via Google CDN; version 0.11.2 used here -->
    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/0.11.2/angular-material.min.js"></script>
```

#### Create Angular's directories

- Create a directory named **app** in `assets/js/`.
- Create a directory named **controllers** in `assets/js/app/`.
- Create a a directory named **components** in `views/` to put Angular's components views.


if needed:

- Create a directory named **services** in `assets/js/app/`.
	- Create a directory named **models** in `assets/js/app/services/`.
- Create a directory named **directives** in `assets/js/app/`.
- Create a directory named **filters** in `assets/js/app/`.

The structure should look like this :

```
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── firstModule
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── secondModule
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── firstModule
│   │   │   └── directive1.js
│   │   └── secondModule
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   ├── firstModule
│   │   │   ├── filter1.js
│   │   │   └── filter2.js
│   │   └── secondModule
│   │       └── filter3.js
│   └── services
│       ├── FirstService.js
│       ├── SecondService.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
```

#### Create the Angular app

- Create the **app.js** file in `assets/js/app/` and add this line to init the app (and load the Angular Material library) :

```javascript
var app = angular.module('sangu', ['ngMaterial']);
```

- Open the `views/layout.ejs` file and add these attributes to the body tag : `<body ng-app="sangu" ng-cloak>`
- Create a file named **main.css** in `assets/styles/` and add the following code snippet in order to wait for Angular's loading before showing the view :

```css
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
 }
```

#### Naming and location conventions


Element | Naming style | Example | File | Location
--------|--------|--------|--------|--------
Modules | lowerCamelCase  | angularApp | angularApp.js | `assets/js/app/`
Controllers | Functionality + 'Ctrl'  | AdminCtrl | AdminCtrl.js | `assets/js/app/controllers/`
Directives | lowerCamelCase  | userInfo | userInfo.js | `assets/js/app/directives/`
Filters | lowerCamelCase | userFilter | userFilter.js | `assets/js/app/filters/`
Services | UpperCamelCase | User | User.js | `assets/js/app/services/`
Views | lowerCamelCase | mail | mail.ejs | `views/components/`


#### Controllers structure

- The structure of a controller's file is :

```javascript
app.controller('DemoCtrl', DemoCtrl);

function DemoCtrl() {
  // attributes
  // ...
  // methods
}
```

- Example (`assets/js/app/controllers/MailCtrl.js`):

```javascript
app.controller('MailCtrl', MailCtrl);

function MailCtrl() {
  this.showTooltip = false
  this.list = [
    {
      title: 'Gautier is a wonderful guy',
      sender: 'Laure',
      body: 'I loooove Gautier !'
    },
    {
      title: 'Arthur + Bastien = <3 ?',
      sender: 'Gautier',
      body: 'I was wondering if....'
    }
  ]

  this.add = function() {
    this.list.push({
      title: 'I love you bro !',
      sender: 'Bastien',
      body: 'I need to tell you something Arthur...'
    })
  }
}

```

#### Views management

- Explode views as subcomponents and put them in `views/components/`
- Then you can include components with the `<% include component.ejs %>` ejs's command.
- Example (`views/homepage.ejs`):

```html
<% include components/sidebar.ejs %>
<div layout="column" class="relative" layout-fill role="main">
  <md-toolbar class="md-primary">
  </md-toolbar>
  <md-content>
    <% include components/hello.ejs %>
    <% include components/mail.ejs %>
  </md-content>
</div>
```
- Link components to Angular's controllers with the `ng-controller` attribute.
- Example (`views/components/hello.ejs`):

```html
<div ng-controller="HelloCtrl as hello">
    <h1>Hello {{ name }} !</h1>
</div>
```

**/!\ Important /!\\**

- One controller per component.
- According to the naming convention if the controller's name is `MailCtrl.js` then the view's name must be `mail.ejs`.


#### Run your app and enjoy :tada:

`sails lift` and go to `http://localhost:1337` !


### Communication between Angular and Sails

    Work in progress...

## License


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
