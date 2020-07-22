const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const dateRoute = require("./routes/dateRoute");
const taskRoute = require("./routes/taskRoute");
//routes

require("dotenv").config();
require("./db/mongoose");

app.use(express.json());
app.use(cors());
app.use(dateRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log("Server start", port);
});
