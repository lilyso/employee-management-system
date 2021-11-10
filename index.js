require("dotenv").config();
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
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
    console.log(`Connected to the employee_db database.`)
  );
  const promisePool = db.promise();
  await manage(promisePool);
}

main();
