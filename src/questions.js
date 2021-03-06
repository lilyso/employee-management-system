const colors = require("colors");

// Option questions

const startQs = [
  {
    name: "start",
    message: "What would you like to do?",
    choices: [
      "View all Employees",
      "Add new Employee",
      "Update Employee Role",
      "Delete Employee",
      "View all Roles",
      "Add Role",
      "Delete Role",
      "View all Departments",
      "Add Department",
      "Delete Department",
      "View Department Budget",
      "View Employees by Department",
      "Quit",
    ],
    loop: true,
    type: "list",
  },
];

// Add new employee questions

const addEmployeeQs = ({ roles, managers }) => [
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
    message: "Choose a manager",
    type: "list",
    choices: () => {
      const managerChoices = [{ name: "No manager", value: "null" }];
      managers.forEach((manager) => {
        managerChoices.push({
          name: manager.first_name + " " + manager.last_name,
          value: manager.id,
        });
      });
      return managerChoices;
    },
  },
];

// Update employee role questions

const updateEmpRoleQs = (showEmployees, findNewRole) => [
  {
    name: "employee",
    message: "Please choose an employee to update.",
    type: "list",
    choices: () => {
      const employeeChoices = [];
      showEmployees.forEach((employee) => {
        employeeChoices.push({
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        });
      });
      return employeeChoices;
    },
  },
  {
    name: "newRole",
    message: "Pick new role",
    type: "list",
    choices: findNewRole.map((newRole) => {
      return { name: newRole.title, value: newRole.id };
    }),
  },
];

// Delete employee

const deleteEmployeeQs = (findEmployees) => [
  {
    name: "employees",
    message: "Which employee would you like to delete?",
    type: "list",
    choices: findEmployees.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    }),
  },
];

// Add new role questions

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

// Delete role

const deleteRoleQs = (findRoles) => [
  {
    name: "roles",
    message: "Which role would you like to delete?",
    type: "list",
    choices: findRoles.map((role) => {
      return { name: role.title, value: role.id };
    }),
  },
];

// Add new department questions

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

// Delete department questions

const deleteDepQs = (departments) => [
  {
    name: "department",
    message: "Which department would you like to delete?",
    type: "list",
    choices: departments.map((department) => {
      return { name: department.name, value: department.id };
    }),
  },
];

// View department budget questions

const viewBudgetQs = (departments) => [
  {
    name: "department",
    message: "Choose a department to view budget",
    type: "list",
    choices: departments.map((department) => {
      return { name: department.name, value: department.id };
    }),
  },
];

// Add employees by department questions

const viewEmplDepQs = (departments) => [
  {
    name: "department",
    message: "Choose a department to view employees",
    type: "list",
    choices: departments.map((department) => {
      return { name: department.name, value: department.id };
    }),
  },
];

module.exports = {
  startQs,
  addEmployeeQs,
  addRoleQs,
  deleteRoleQs,
  addDepQs,
  updateEmpRoleQs,
  deleteDepQs,
  deleteEmployeeQs,
  viewBudgetQs,
  viewEmplDepQs,
};
