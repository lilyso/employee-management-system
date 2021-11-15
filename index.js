require("dotenv").config();
const colors = require("colors");
const cTable = require("console.table");
const manage = require("./src/manage.js");

// Connect to database
async function main() {
  const mysql = require("mysql2");
  const db = mysql.createPool(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "employee_db",
    },
    console.log("\nConnected to the employee_db database.\n"),
    console.log(colors.blue("********************************")),
    console.log(colors.blue("*                              *")),
    console.log(colors.blue("*  EMPLOYEE MANAGEMENT SYSTEM  *")),
    console.log(colors.blue("*                              *")),
    console.log(colors.blue("********************************\n"))
  );
  const promisePool = db.promise();
  await manage(promisePool);
}

main();

module.exports = main;
