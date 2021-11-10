const inquirer = require("inquirer");
const cTable = require("console.table");
const startQs = require("./questions.js");

// const manage = async (db) => {
async function askQ(db) {
  inquirer
    .prompt(startQs)
    .then((answer) => {
      console.log(answer.start);
      switch (answer.start) {
        case "View all Employees":
          selectEmployees(db);
          break;
        case "Update Employee Role":
          updateEmployee(db);
          break;
        case "View all Roles":
          viewRoles(db);
          break;
        case "Add Role":
          addRole(db);
          break;
        case "View all Departments":
          viewDep(db);
          break;
        case "Add Department":
          addDep(db);
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
}

async function selectEmployees(db) {
  let [rows, fields] = await db.query("SELECT * FROM employee");
  console.table(rows);
  askQ(db);
}

async function viewRoles(db) {
  let [rows, fields] = await db.query("SELECT * FROM employee_role");
  console.table(rows);
  askQ(db);
}

module.exports = askQ;
