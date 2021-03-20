// imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// initializations
const app = express();
dotenv.config();

// routes imports here
const appRoutes = require("./routes/app");
const transactionRoutes = require("./routes/transaction");
const converterRoutes = require("./routes/converter");

// allow application to be consumed
app.use(cors());

// body-parser middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/transaction", transactionRoutes);
app.use("/converter", converterRoutes);
app.use("/", appRoutes);

// executes queries
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server in port " + port + ": \x1b[32m%s\x1b[0m", "online");
});
