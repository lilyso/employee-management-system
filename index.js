require("dotenv").config();
// Import and require mysql2

// Connect to database
async function main() {
  const mysql = require("mysql2");
  const db = await mysql.createPool(
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

  // Query database
  const createTables = await db.execute(
    "SOURCE ./db/schema.sql",
    function (err, results) {
      console.log(results);
    }
  );
}

main();
