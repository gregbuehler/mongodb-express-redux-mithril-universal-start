# mongodb-express-redux-mithril-universal-start

## Project

- This project is to provide a new project starter using MongoDB, Expressjs, Reduxjs and Mithriljs.

- This project is also to demonstrate the server-side rendering ( aka universal ) of Single Page Application using mithril.

- Client and Server folder structures are kept as same for easy development and maintenance.

- Each related files contains in each folder for easy maintenance and future expansion.

- Site folder is separately provided for customization and easy upgrade of this project.
	
- This project is forked from [mithril-quickstart by konsumer](https://github.com/konsumer/mithril-quickstart)

## Demo

   See the demo: [https://merm.herokuapp.com/](https://merm.herokuapp.com/) 

## Features

-  MongoDB, Expressjs, Reduxjs, Mithriljs
-  Universal ( Server-side rendering )
-  Quick & easy to get started
-  Mithril is easy to learn and use. Faster to load & render than react. It's clean & small, and does it's job well.
-  Express middleware efficiently handles building CSS & javascript, so no grunt/gulp!
-  Comment widgets/animations you don't need from bootstrap and [animation.less](https://github.com/machito/animate.less)
-  Easily themable using [bootswatch](http://bootswatch.com/)
-  Slick & efficient JWT+bcrypt+mongodb authentication
-  User Email verification when registered.
-  Userid is used to login instead of email.
-  Browser-sync and nodemon are used for live reloading the browser in development.
-  Blog and User administration are included.
-  Pages are cached automatically by Redux. 
-  ES5 is used. ( No ES6 and ES7, hence no need of Babel )
-  Browserify and LessMiddleware are used for client-side processing.
-  Server-side rendering is done by mithril-node-render ( [StephanHoyer, mithril-node-render](https://github.com/StephanHoyer/mithril-node-render) ).
-  Markdown format can be used for Blog. 

## Requirement
-   MongoDB is required.
-   Change site/config as required for your needs.
-   ( site directory has seed data. Change these as you wish.)

## Setup for production 
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm start`
-  `go to` [http://localhost:3000/login](http://localhost:3000/login)
-  login using id: 'admin' and password: 'admin'
-  [change admin id and password](http://localhost:3000/user)  

## Setup for development with browsersync and nodemon  
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm run dev`
-  `go to` [http://localhost:3001/login](http://localhost:3001/login)
-  login using id: 'admin' and password: 'admin'
-  [change admin id and password](http://localhost:3001/user) 

## Test
-   Unit test uses [Mocha](https://www.npmjs.com/package/mocha) and [Expect](https://www.npmjs.com/package/expect).
-	E2e test uses [selenium-standalone server](https://www.npmjs.com/package/selenium-standalone) and [WebDriverIO](https://www.npmjs.com/package/webdriverio). ( !! important: WebDriverIO 3.3.0 version should be used. WebDriverIO 4 causes a test error.)

-   [WebDriverIO API is here](http://webdriver.io/api.html)

-	For unit test,
	
	1. Run the following command. ( There is no need to run the application. )

		`npm run testspec`

- 	For e2e test, follow the 3 steps.

	1. Run the selenium-standalone server

		`npm run testselenium`

	2. Run the application in test mode

		`npm run testserver`

	3. Run the e2e test

		`npm run teste2e`

-  To run unit test and e2e test together

		`npm test`


## Configuration

Use `.env` to set environment variables. Here are some good ones:

```
MONGO_URI=mongodb://localhost/myfarkensweetapp
TOKEN_SECRET=kittyonth4keyb04rdME0W!ksjdhfwpeoir
PORT=3000
```
## To change the bootstrap theme:
Open style/bootstap.less. Change the theme name 'paper' to others.

## When the bootstap style is not applied:
check if the style is not commented out in style/bootstrap.less.
If so, remove the comment line of the style you want to use.

## TODO
1. test
2. build