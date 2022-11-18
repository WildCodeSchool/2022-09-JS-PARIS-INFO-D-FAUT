const express = require("express");
const cors = require("cors");
const router = require("../Views/router");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// API routes
app.use(router);

module.exports = app;
