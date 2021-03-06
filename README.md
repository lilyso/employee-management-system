# Employee Management System

> A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.
> Demo [_here_](https://watch.screencastify.com/v/3MM6CRkllbRu4W4WW9wU).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)
- [License](#license)

## General Information

> USER STORY
>
> AS A business owner
>
> I WANT to be able to view and manage the departments, roles, and employees in my company
>
> SO THAT I can organize and plan my business

The Employee Management System is a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL. The user has the ability to view, add and delete employees, employee roles and departments.

## Technologies Used

- JavaScript
- Node.js

## Dependencies

- inquirer.js
- mysql2
- colors.js
- console.table
- dotenv

## Features

- View, add, delete and update employees
- View, add and delete employee roles
- View, add and delete departments
- View budget by department
- View employees by department

## Screenshots

![Employee Management System Screenshot](src/assets/images/employee-database-screenshot.png)
![Employee Management System Screenshot](src/assets/images/employee-management-system-example2.png)

## Setup

1. Git clone repository from the command line.

```shell
git clone https://github.com/lilyso/employee-management-system.git
```

2. Install dependecies by executing the following in your command line:

```
npm install
```

3. Set up your environment variables for your mysql database:

![env-example screenshot](src/assets/images/env-example1.png)

4. Set up your mysql database:

```shell
mysql -u root -p
(* Use "root" or preferred user login)

Enter Password:
(* Your mysql password)

source db/schema.sql

source db/seeds.sql
(* This is the test value file. Do not execute if not needed or enter your preferred values)
```

## Usage

To start using the Employee Management System, enter:

```
node index.js
```

Once executed, the employee management options will be displayed.

## Room for Improvement

Room for improvement:

- Ability to filter employees by manager.
- Ability to update employees by manager.

## Contact

Created by [@lilyso](https://github.com/lilyso) - feel free to contact me!

## License

This project is open source and available under the [MIT License](LICENSE).
