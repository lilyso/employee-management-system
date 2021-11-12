const inquirer = require("inquirer");
const cTable = require("console.table");
const {
  startQs,
  addEmployeeQs,
  addRoleQs,
  addDepQs,
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

// View and add employees

async function selectEmployees(db) {
  let [rows] = await db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS department, employee_role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id"
  );
  console.table("\r", rows);
  askQ(db);
}

async function addEmployee(db) {
  let [roles] = await db.query("SELECT id, title FROM employee_role");
  let getRoleDep = addEmployeeQs(roles);
  let employeeQs = await inquirer.prompt(getRoleDep).then(async (answer) => {
    let addEmployee = await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.fname}", "${answer.lname}", ${answer.role}, null)`
    );
    console.log(answer);
    console.log("Employee has been added");
    askQ(db);
  });
}

// View and add roles

async function viewRoles(db) {
  let [rows] = await db.query(
    "SELECT employee_role.id, employee_role.title,department.name, employee_role.salary FROM employee_role INNER JOIN department ON employee_role.department_id = department.id"
  );
  console.table("\r", rows);
  askQ(db);
}
async function addRole(db) {
  let [departments] = await db.query("SELECT * FROM department");
  console.log(departments);
  let qs = addRoleQs(departments);
  let roleQs = await inquirer.prompt(qs).then(async (answer) => {
    let addRole = await db.query(
      `INSERT INTO employee_role (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", ${answer.department})`
    );
    console.log(answer);
    console.log("Role has been added");
    askQ(db);
  });
}

// View and add departments

async function viewDep(db) {
  let [rows] = await db.query("SELECT * FROM department");
  console.table("\r", rows);
  askQ(db);
}

async function addDep(db) {
  let [rows] = await db.query("SELECT * FROM department");
  let roleQs = await inquirer.prompt(addDepQs).then(async (answer) => {
    let addDep = await db.query(
      `INSERT INTO department (name) VALUES ("${answer.department}")`
    );
    console.log("Department has been added");
    askQ(db);
  });
}

module.exports = askQ;
