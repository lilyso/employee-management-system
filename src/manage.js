const inquirer = require("inquirer");
const cTable = require("console.table");
const {
  startQs,
  addEmployeeQs,
  addRoleQs,
  addDepartmentQs,
} = require("./questions.js");

async function askQ(db) {
  inquirer
    .prompt(startQs)
    .then((answer) => {
      console.log(answer.start);
      switch (answer.start) {
        case "View all Employees":
          selectEmployees(db);
          break;
        case "Add new Employee":
          addEmployee(db);
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
  let [rows] = await db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS department, employee_role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id"
  );
  console.table("\r", rows);
  askQ(db);
}

async function addEmployee(db) {
  let employeeQs = await inquirer.prompt(addEmployeeQs).then(async (answer) => {
    let [rows] = await db.query(
      `SELECT employee_role.id, employee_role.title FROM employee_role WHERE employee_role.title ="${answer.role}"`
    );
    let addEmployee = await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${
        answer.fname
      }", "${answer.lname}", ${parseInt(rows[0].id)}, null)`
    );
    console.log(rows);
    askQ(db);
  });
}

async function viewRoles(db) {
  let [rows] = await db.query(
    "SELECT employee_role.id, employee_role.title,department.name, employee_role.salary FROM employee_role INNER JOIN department ON employee_role.department_id = department.id"
  );
  console.table("\r", rows);
  askQ(db);
}
async function addRole(db) {
  let roleQs = await inquirer.prompt(addRoleQs).then(async (answer) => {
    let [rows] = await db.query(
      `SELECT department.id, department.name FROM department WHERE department.name ="${answer.department}"`
    );
    let addRole = await db.query(
      `INSERT INTO employee_role (title, salary, department_id) VALUES ("${
        answer.title
      }", "${answer.salary}", ${parseInt(rows[0].id)})`
    );
    console.log(rows);
    askQ(db);
  });
}

async function viewDep(db) {
  let [rows] = await db.query("SELECT * FROM department");
  console.table("\r", rows);
  askQ(db);
}

module.exports = askQ;
