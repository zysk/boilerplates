# AdminJs Base App

This is a adminJs base app with express and mongoose setup. It can be used as a boilerplate for creating other nodejs and mongodb based adminJs applications.

## Features

- Express framework for creating RESTful APIs
- Mongoose for interacting with MongoDB database
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
- The app will listen on the port specified by the PORT environment variable or 8080
- The app will connect to the MongoDB database specified by the MONGODB_URI environment variable
- The app 'src' contains model and resoucres required adminJs

## Customization

- To use this app as a boilerplate for your own project, you need to make some changes in the following files:
  - package.json: Change the name, description, author, and other fields according to your project details
  - readme.md: Remove or update the contents of readme according to your project
  - app.js: Add or modify the resources and logic according to your project requirements
  - .env files: Add or modify the environment variables according to your project configuration

## License

This project is licensed under the MIT License. See the LICENSE file for more details.