const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { sql, poolPromise } = require("../config/db");

/* REGISTER */
exports.register = async (req, res) => {
  try {

    const { email, password } = req.body;

    const pool = await poolPromise;

    const check = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email=@email");

    if (check.recordset.length > 0) {
      return res.status(400).json({ msg: "User exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hash)
      .query("INSERT INTO Users (email,password) VALUES (@email,@password)");

    res.json({ msg: "Registered" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};


/* LOGIN */
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const pool = await poolPromise;

    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email=@email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = result.recordset[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id },
      "mysecretkey",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};
