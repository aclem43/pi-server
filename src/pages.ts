import express from "express";
import path from "path";
export const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../static/index.html"));
});
