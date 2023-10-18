# Nodejs Base App

This is a nodejs base app with express, logger and mongoose setup. It can be used as a boilerplate for creating other nodejs applications.

## Features

- Express framework for creating RESTful APIs
- Mongoose for interacting with MongoDB database
- Logger for logging requests and responses
- Dotenv for managing environment variables
- Cross-env for setting environment variables in different environments
- Nodemon for automatic reloading of the app in development mode
- Body-parser for parsing request body parameters 

## Installation

- Clone this repository or download it as a zip file
- Navigate to the project directory and run `npm install` to install the dependencies
- Create separate .env files for each environment, such as .env.dev and .env.prod
- Add your environment variables to each file as specified in 'env/.env.default'. 

## Usage

- Run `npm run dev` to start the app in development mode with nodemon
- Run `npm run prod` to start the app in production mode with node
- The app will listen on the port specified by the PORT environment variable or 3000
- The app will connect to the MongoDB database specified by the MONGODB_URI environment variable
- The app will log all the incoming request in the terminal using morgan
- The app 'src' contains routes, model, controller:
  - routes: routes.js file within this folder contains all the routes that the app is exposed
  - models: Models are responsible for managing the data and business logic of the application. They interact with the database and perform validations, calculations, and transformations on the data. Every collection in the database will have its own model file
  - controller: Controllers are responsible for handling the requests and responses of the application. Every route in routes.js will call the methods in the respective controllers.Every model will have its own controller

## Customization

- To use this app as a boilerplate for your own project, you need to make some changes in the following files:
  - package.json: Change the name, description, author, and other fields according to your project details
  - readme.md: Remove or update the contents of readme according to your project
  - app.js: Add or modify the routes, middleware, models, and logic according to your project requirements
  - .env files: Add or modify the environment variables according to your project configuration

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
