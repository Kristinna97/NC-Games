# Northcoders House of Games API

This project is the back-end project of the Northcoders Bootcamp. It was build using TDD and implemented using Express and  Postgres to create a functional API.

-> You can see live verion of the app on the following link
https://northcoders-nc-games.herokuapp.com/api

## Cloning
To clone the project fork it from my repo and run<br />

* 'git clone "your_fork's_url"' on your machine<br />

## Installing
To install all of the dependencies on your machine navigate to the project directory and run<br />

* 'npm install'<br />
this will install everything you need for the API to work locally on your machine

## Seeding the Database
#.env files

In order to successfully connect to the databases and run it locally you will have to create a .env files <br />and set the correct database name  for the correct environment.<br /> You can do this by adding 'PGDATABASE=db-name' where db-name is going to  be the correct DB name.<br /> You can find information of DB names in /db/setup.sql file. Also make sure you<br /> .gitignore this files so you dont share your environment variables.

To seed the database locally you need to run the scripts provided with the following commands<br />
* 'npm run setup-dbs' <br />
-to set up the Database<br />
* 'npm run seed'<br />
-to seed the Database<br />

## Running Tests
To run the tests you will have to run
* 'npm run "test_file_name"'
where "test_file_name" is going to be the name of the test you want to run.<br />
 If you are not in the directory where the tests are, you will have to provide relative path to the test file

## Minimum version requrements 
* Node.js: v18.2.0
* Postgres: v12.9
