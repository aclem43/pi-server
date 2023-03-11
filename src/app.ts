import express from "express";
import cors from "cors";
const app = express();
import { router as apiRouter } from "./api/api";
import { router as pagesRouter } from "./pages";
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use("/", pagesRouter);
app.use("/api/", apiRouter);
app.listen(3000, "0.0.0.0", () => {
  return console.log(`Express is listening at http://0.0.0.0:${port}`);
});
