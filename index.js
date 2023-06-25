const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const studentRoutes = require("./routes/studentRoutes");
const electiveSubjectRoutes = require("./routes/electiveSujectRoutes");
const dbConnection = require("./config/database");
const PORT = process.env.PORT || 4001;

app.use(express.json());
//calling the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//database connection
dbConnection();

//check server
app.get("/", (req, res) => {
  try {
    return res.send("ok from server");
  } catch (err) {
    console.log(err);
  }
});

//routes
app.use("/student", studentRoutes);
app.use("/electivesubject", electiveSubjectRoutes);
