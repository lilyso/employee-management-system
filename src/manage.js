const inquirer = require("inquirer");
const colors = require("colors");
const cTable = require("console.table");
const {
  startQs,
  addEmployeeQs,
  deleteEmployeeQs,
  addRoleQs,
  deleteRoleQs,
  addDepQs,
  updateEmpRoleQs,
  deleteDepQs,
} = require("./questions.js");

// Manage employees questions

async function askQ(db) {
  inquirer
    .prompt(startQs)
    .then((answer) => {
      switch (answer.start) {
        case "View all Employees":
          selectEmployees(db);
          break;
        case "Add new Employee":
          addEmployee(db);
          break;
        case "Update Employee Role":
          updateEmployeeRole(db);
          break;
        case "Delete Employee":
          deleteEmployee(db);
          break;
        case "View all Roles":
          viewRoles(db);
          break;
        case "Add Role":
          addRole(db);
          break;
        case "Delete Role":
          deleteRole(db);
          break;
        case "View all Departments":
          viewDep(db);
          break;
        case "Add Department":
          addDep(db);
          break;
        case "Delete Department":
          deleteDep(db);
          break;
        case "Quit":
          console.log(colors.cyan("\nBye\n"));
          return;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(colors.red("Your console environment is not supported!"));
      } else {
        console.log(colors.red(`An error has occurred - ${error}`));
      }
    });
}

// View all employees

async function selectEmployees(db) {
  try {
    let [allEmployees] = await db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS department, employee_role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id ORDER By last_name"
    );
    console.table("\r", allEmployees);
    askQ(db);
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured selecting employees - ${error}\n`)
    );
  }
}

// Add employees

async function addEmployee(db) {
  try {
    let [roles] = await db.query("SELECT id, title FROM employee_role");
    let [managers] = await db.query(
      "SELECT * FROM employee WHERE manager_id IS null"
    );
    let getRoleMan = addEmployeeQs({ roles, managers });
    let employeeQs = await inquirer.prompt(getRoleMan).then(async (answer) => {
      let addEmployee = await db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.fname}", "${answer.lname}", ${answer.role}, ${answer.manager})`
      );
      console.log(colors.green("\nEmployee has been added\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured adding employee - ${error}\n`)
    );
  }
}
// Update employee role

async function updateEmployeeRole(db) {
  try {
    let [showEmployees] = await db.query("SELECT * FROM employee");
    let [findNewRole] = await db.query("SELECT * FROM employee_role");
    let updateRoleQs = updateEmpRoleQs(showEmployees, findNewRole);
    let roleQs = await inquirer.prompt(updateRoleQs).then(async (answer) => {
      let updateRole = await db.query(
        `UPDATE employee SET employee.role_id = ${answer.newRole} WHERE employee.id = ${answer.employee}`
      );
      console.log(colors.green("\nRole has been updated\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured updating employee role - ${error}\n`)
    );
  }
}

// Delete employee

async function deleteEmployee(db) {
  try {
    let [findEmployees] = await db.query("SELECT * FROM employee");
    let delEmpQs = deleteEmployeeQs(findEmployees);
    let roleQs = await inquirer.prompt(delEmpQs).then(async (answer) => {
      let deleteEmpNow = await db.query(
        `DELETE FROM employee WHERE ${answer.employees} = employee.id`
      );
      console.log(colors.yellow("\nEmployee has been deleted\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured deleting employee - ${error}\n`)
    );
  }
}

// View all roles

async function viewRoles(db) {
  try {
    let [allRoles] = await db.query(
      "SELECT employee_role.id, employee_role.title,department.name, employee_role.salary FROM employee_role INNER JOIN department ON employee_role.department_id = department.id"
    );
    console.table("\r", allRoles);
    askQ(db);
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured selecting employee roles - ${error}\n`)
    );
  }
}

// Add roles

async function addRole(db) {
  try {
    let [departments] = await db.query("SELECT * FROM department");
    let qs = addRoleQs(departments);
    let roleQs = await inquirer.prompt(qs).then(async (answer) => {
      let addRole = await db.query(
        `INSERT INTO employee_role (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", ${answer.department})`
      );
      console.log(colors.green("\nRole has been added\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured adding employee roles - ${error}\n`)
    );
  }
}

// Delete Role

async function deleteRole(db) {
  try {
    let [findRoles] = await db.query("SELECT * FROM employee_role");
    let eq = deleteRoleQs(findRoles);
    let findRoleQs = await inquirer.prompt(eq).then(async (answer) => {
      let deleteRoleNow = await db.query(
        `DELETE FROM employee_role WHERE ${answer.roles} = employee_role.id`
      );
      console.log(colors.yellow("\nRole has been deleted\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured deleting employee roles - ${error}\n`)
    );
  }
}

// View all departments

async function viewDep(db) {
  try {
    let [allDep] = await db.query("SELECT * FROM department");
    console.table("\r", allDep);
    askQ(db);
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occured selecting departments - ${error}\n`)
    );
  }
}

// Add department

async function addDep(db) {
  try {
    let [rows] = await db.query("SELECT * FROM department");
    let addNewDepQs = await inquirer.prompt(addDepQs).then(async (answer) => {
      let addNewDep = await db.query(
        `INSERT INTO department (name) VALUES ("${answer.department}")`
      );
      console.log(colors.green("\nDepartment has been added\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occurred adding department - ${error}\n`)
    );
  }
}

// Delete department

async function deleteDep(db) {
  try {
    let [departments] = await db.query("SELECT * FROM department");
    let dq = deleteDepQs(departments);
    let deleteDep = await inquirer.prompt(dq).then(async (answer) => {
      let deleteDepNow = await db.query(
        `DELETE FROM department WHERE department.id = ${answer.department}`
      );
      console.log(colors.yellow("\nDepartment has been deleted\n"));
      askQ(db);
    });
  } catch (error) {
    console.log(
      colors.red(`\nAn error has occurred deleting department - ${error}\n`)
    );
  }
}

module.exports = askQ;
