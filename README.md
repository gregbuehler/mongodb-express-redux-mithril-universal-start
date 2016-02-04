# mongodb-express-redux-mithril-universal-start

## Project

- This project is to provide a new project starter using MongoDB, Expressjs, Reduxjs and Mithriljs.

- This project also demonstrate the server-side rendering ( aka universal ) of Single Page Application using mithril.

- Client-side views are used as it is for Server-side rendering. 

- Client and Server folder structures are kept as same for easy development and maintenance.

- Each page is made to exist in each folder for consistency and future expansion.

- Site folder is separately provided for customization and easy upgrade of this project.
	
- This project is forked from [mithril-quickstart by konsumer](https://github.com/konsumer/mithril-quickstart)

## features

-  MongoDB, Expressjs, Reduxjs, Mithriljs
-  Universal ( Server-side rendering )
-  Quick & easy to get started
-  Mithril rocks. Faster to load & render than react. It's clean & small, and does it's job well.
-  Express middleware efficiently handles building CSS & javascript, so no grunt/gulp!
-  Comment widgets/animations you don't need from bootstrap and [animation.less](https://github.com/machito/animate.less)
-  Easily themable using [bootswatch](http://bootswatch.com/)
-  Slick & efficient JWT+bcrypt+mongodb authentication
-  User Email verification when registered.
-  Userid is used to login instead of email.
-  Browser-sync and nodemon are used for live reloading the browser in development.
-  Blog and User administration are included.
-  pages are cached automatically by Redux. 
-  ES5 is used. ( No ES6 and ES7, hence no need of Babel )
-  Browserify and LessMiddleware are used for client-side processing.
-  By using Redux, page-caching are automatically achieved. 
-  Server-side rendering is done by mithril-node-render ( [StephanHoyer, mithril-node-render](https://github.com/StephanHoyer/mithril-node-render) ). 

## requirement
-   MongoDB is required.
-   Change site/config as required for your needs.
-   ( site directory has seed data. Change these as you wish.)

## setup for production 
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm start`
-  `go to` [http://localhost:3000/login](http://localhost:3000/login)
-  login using id: 'admin' and password: 'admin'
-  [change admin id and password](http://localhost:3000/user)  

## setup for development with browsersync and nodemon  
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm run dev`
-  `go to` [http://localhost:3001/login](http://localhost:3001/login)
-  login using id: 'admin' and password: 'admin'
-  [change admin id and password](http://localhost:3001/user)  

## configuration

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
1. blog and User pagination.
2. markdown format for blog. 
3. test
4. build