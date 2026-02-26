const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};" +
    "Server=MUTHU\\SQLEXPRESS;" +
    "Database=EMPLOYEE;" +
    "Trusted_Connection=Yes;" +
    "Encrypt=No;" +
    "TrustServerCertificate=Yes;"
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log("✅ SQL Server Connected Successfully");
    return pool;
  })
  .catch(err => {
    console.error("❌ SQL Error:", err);
  });

module.exports = {
  sql,
  poolPromise
};
