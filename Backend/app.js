const express = require("express");
const cors = require("cors");
const router = require("./app/routes")
const fileUpload = require("express-fileupload");
const ApiError = require("./app/api-error");
const app = express();
app.use(cors());
app.options('*',cors());
app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

router(app)

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found."));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
