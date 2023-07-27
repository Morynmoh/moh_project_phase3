# Transaction Tracker

## Project Description
Transaction Tracker is a web application that allows users to track their expenses and transactions. Users can add new expenses, update existing ones, and delete expenses as needed. The application provides a simple and convenient way to manage and monitor financial transactions.

### Author
This project was developed by Maureen Omamo  courtesy of Moringa School. 

Project TM: Rhona Joy and Erick Mong'are
Thank you and do enjoy.
I can be reached for further clarification -> `morynmoh@gmail.com`

# Project Setup Instructions
To set up and run the Transaction Tracker project locally, follow these steps:

FrontEnd -> `git clone git@github.com:Morynmoh/moh_project_phase3.git`
BackEnd -> `git clone git@github.com:Morynmoh/moh_project_phase3_backend.git`
Live Site link: `https://transaction-checker.vercel.app/`

# Change into the project directory:
`cd transaction-tracker`

# Install the required dependencies:
`npm install`
# Start the development server:
`npm start`

Open your web browser and navigate to http://localhost:9292 to view the application.

##### Setting Up the Backend with Sinatra
You can use to get a Sinatra backend up and
running. 
[fork link]: https://github.com/learn-co-curriculum/phase-3-sinatra-react-project/fork

# Install Ruby and Sinatra:
Make sure you have Ruby installed on your system. You can check by running ruby -v in the terminal. If it's not installed, download and install Ruby from the official website (https://www.ruby-lang.org/en/downloads/). 

# Install the Sinatra gem by running gem install sinatra.
This is after installing Ruby

# Create a New Project Directory:
Create a new directory for your Sinatra backend project and navigate to it in the terminal.

# Create Gemfile:
Inside the project directory, create a file named Gemfile. This file will be used to manage your project's dependencies. Add the following content to it:
source "https://rubygems.org"
`gem "sinatra", "~> 2.1"`
`gem 'pg', '~> 1.5', '>= 1.5.3'`
`gem 'puma', '~> 6.3'`
`gem "rack-contrib", "~> 2.3"`
`gem "rack-cors", "~> 1.1"`
`gem "activerecord", "~> 6.1"`
`gem "sinatra-activerecord", "~> 2.0"`
`gem "rake", "~> 13.0"`
`gem 'rest-client', '~> 2.1'`
`gem 'rack', '2.2.3'`
`gem 'solargraph'`
`gem "sqlite3", "~> 1.4"`
`gem "require_all", "~> 3.0"`

`group :development do`
  `gem "pry", "~> 0.14.1"`
  `gem "rerun"`
`end`

`group :test do`
  `gem "database_cleaner", "~> 2.0"`
  `gem "rack-test", "~> 1.1"`
  `gem "rspec", "~> 3.10"`
  `gem "rspec-json_expectations", "~> 2.2"`
`end`

Then run `bundle install` in the terminal to install the required gems.

# PostgreSQL Installation
Using Linux (Ubuntu/Debian)
1. Install the Package Manager:
Open a terminal and run the following commands:

`sudo apt update`
`sudo apt install postgresql postgresql-contrib`

2. PostgreSQL Global Development Group's APT Repository (recommended):
Add the PostgreSQL Global Development Group's APT repository to your system and install PostgreSQL by running the following commands:
`sudo apt update`
`sudo apt install postgresql`

For Windows and macOS versions, refer to the internet documentation.

3. Start the PostgreSQL Server:
The installation process typically starts the PostgreSQL server automatically. If not, you can start it manually using the following command:
`sudo service postgresql start`

4. Create a PostgreSQL User and Database:
By default, PostgreSQL creates a user named "postgres" during installation. You can use this user or create a new one. To create a new user and a database, follow these steps:

Log in as the "postgres" user:
`sudo -u postgres psql`

Create a new user and database (replace "username" and "database_name" with your desired values):
`CREATE USER username WITH PASSWORD 'your_password';`
`CREATE DATABASE database_name OWNER username;`

Grant necessary privileges to the user (optional):
`ALTER USER username CREATEDB;`

Exit the PostgreSQL prompt:
`\q`

5. Configure PostgreSQL Authentication:
By default, PostgreSQL uses peer authentication on Unix-like systems. You may want to change this to password authentication or use other authentication methods. Update the pg_hba.conf file to configure authentication.

6. Connect to PostgreSQL:
You can now connect to PostgreSQL using the command-line client "psql" or a graphical client like pgAdmin.

# Create Main App File:
Create a new file named app.rb in your project directory. This file will serve as the main entry point for your Sinatra application.

# Set Up Basic App Structure:

# Define Model Classes:
Inside app.rb, define your ActiveRecord model classes representing the database tables. 

# Create Database Tables:
To create the database tables, you can use ActiveRecord migrations. Create a new directory named db in your project directory. Inside the db directory, create a new file for each table you want to create using migrations. 

Then, run the migration to create the table by running `rake db:migrate` in the terminal.

# Set Up Routes and Controllers:
Define your API routes and corresponding controllers in app.rb.

# Run the Sinatra App:
In the terminal, run ruby app.rb to start the Sinatra application. It will run on the default port (4567). You can access your API at http://localhost:4567.

# Test Your API:
Use tools like ThunderBolt, or Postman, or your frontend application to test your API endpoints and make sure everything is working as expected.

# Deploy your backend to a production server using platforms like Heroku or AWS or Vercel or Netlify.


##### Live Site
You can access the live version of the Transaction Tracker application on GitHub Pages by visiting the following link: `https://transaction-checker.vercel.app/`

##### Copyright and License
The Transaction Tracker project is licensed under the Moh License. You are free to use, modify, and distribute the code as long as you include the appropriate copyright notice and adhere to the terms of the Moh License.

Please note that the data used in the application is for demonstration purposes only and should not be used for any real financial transactions.

GOD Bless You. Happy Coding!! 