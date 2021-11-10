const inquirer = require("inquirer");
const questions = require("./questions.js");

inquirer
  .prompt(questions)
  .then((answer) => {
    switch (answer) {
      case "View all Employees":
        selectEmployee();
        break;
      case "Update Employee Role":
        updateEmployee();
        break;
      case "View all Roles":
        viewRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View all Departments":
        viewDep();
        break;
      case "Add Department":
        addDep();
        break;
      case "Quit":
        prompts.complete();
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("error");
    } else {
      console.log("Something else went wrong");
    }
  });
