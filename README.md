# mongodb-express-redux-mithril-universal-start

## In progress
   This project is in progress.

   This project is forked from [https://github.com/konsumer/mithril-quickstart]

## features

-  MongoDB, Expressjs, Reduxjs, Mithriljs ( in progress )
-  Universal ( Server-side rendering ) ( in progress )
-  Quick & easy to get started
-  Mithril rocks. Faster to load & render than react. It's clean & small, and does it's job well.
-  Express middleware efficiently handles building CSS & javascript, so no grunt/gulp!
-  Comment widgets/animations you don't need from bootstrap and [animation.less](https://github.com/machito/animate.less)
-  Easily themable using [bootswatch](http://bootswatch.com/)
-  Slick & efficient JWT+bcrypt+mongodb authentication
-  User Email verification when registered.
-  Userid is used to login instead of email.
-  Browser-sync and nodemon are used for easy development.

## requirement
-   MongoDB is required.

## setup for production 
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm start`
-  `go to` [http://localhost:3000](http://localhost:3000)

## setup for development with browsersync and nodemon  
-  [download](https://github.com/whatifif/mongodb-express-redux-mithril-universal-start/archive/master.zip) or
-  `git clone https://github.com/whatifif/mongodb-express-redux-mithril-universal-start.git`
-  `npm install`
-  `npm run dev`
-  `go to` [http://localhost:3001](http://localhost:3001)

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
If so, remove the comment line of what you want to use.