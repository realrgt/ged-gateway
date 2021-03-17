const express = require('express');

const routes = express.Router();

routes.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
    message: "Request executed successfully"
  });
});

module.exports = routes;
