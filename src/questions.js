var colors = require("colors");

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

const addEmployeeQs = [
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
    choices: ["Accountant", "Marketing Coordinator", "Lead Developer"],
    // validate: (input) => {
    //   if (!input) {
    //     console.log(colors.red("\nPlease enter a role"));
    //     return false;
    //   }
    //   return true;
    // },
  },
  {
    name: "manager",
    message: "Enter a manager id or leave blank...",
    type: "list",
    choices: ["Jessica BankTest", "Jared MiddletonTest"],
  },
];

const addRoleQs = [
  {
    name: "title",
    message: "Enter a role...",
    type: "input",
  },
  {
    name: "salary",
    message: "Enter salary...",
    type: "input",
  },
  {
    name: "department",
    message: "Choose department...",
    type: "list",
    choices: ["Marketing", "Engineering", "Finance"],
  },
];

const addDepQs = [
  {
    name: "department",
    message: "Enter department...",
    type: "input",
  },
];

module.exports = { startQs, addEmployeeQs, addRoleQs, addDepQs };
