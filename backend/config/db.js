const sql = require("mssql");

// Database configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // example: yourserver.database.windows.net
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: true, // Required for Azure / cloud SQL
    trustServerCertificate: true
  }
};

// Create connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ SQL Server Connected Successfully");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};