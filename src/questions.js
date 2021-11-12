const colors = require("colors");

const startQs = [
  {
    name: "start",
    message: "What would you like to do?",
    choices: [
      "View all Employees",
      "Add new Employee",
      "Update Employee Role",
      "View all Roles",
      "Add Role",
      "View all Departments",
      "Add Department",
      "Quit",
    ],
    loop: true,
    type: "list",
  },
];

const addEmployeeQs = (roles) => [
  {
    name: "fname",
    message: "Enter first name of employee...",
    type: "input",
    validate: (input) => {
      if (!input) {
        console.log(colors.red("\nPlease enter a name"));
        return false;
      }
      return true;
    },
  },
  {
    name: "lname",
    message: "Enter last name of employee...",
    type: "input",
    validate: (input) => {
      if (!input) {
        console.log(colors.red("\nPlease enter a last name"));
        return false;
      }
      return true;
    },
  },
  {
    name: "role",
    message: "Enter employee role...",
    type: "list",
    choices: roles.map((role) => {
      return { name: role.title, value: role.id };
    }),
  },
  {
    name: "manager",
    message: "Enter a manager id or leave blank...",
    type: "list",
    choices: ["Jessica BankTest", "Jared MiddletonTest"],
  },
];

const addRoleQs = (departments) => [
  {
    name: "title",
    message: "Enter a role...",
    type: "input",
    validate: (input) => {
      if (!input) {
        console.log(colors.red("\nPlease enter a role"));
        return false;
      }
      return true;
    },
  },
  {
    name: "salary",
    message: "Enter salary...",
    type: "input",
    validate: (input) => {
      if (isNaN(input) || !input) {
        console.log(colors.red("\nPlease add a valid number (e.g. 80000)"));
        return false;
      }
      return true;
    },
  },
  {
    name: "department",
    message: "Choose department...",
    type: "list",
    choices: departments.map((department) => {
      return { name: department.name, value: department.id };
    }),
  },
];

const addDepQs = [
  {
    name: "department",
    message: "Enter department...",
    type: "input",
    validate: (input) => {
      if (!input) {
        console.log(colors.red("\nPlease enter a department"));
        return false;
      }
      return true;
    },
  },
];

module.exports = { startQs, addEmployeeQs, addRoleQs, addDepQs };
