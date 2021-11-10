const startQs = [
  {
    name: "start",
    message: "What would you like to do?",
    choices: [
      "View all Employees",
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

module.exports = startQs;
