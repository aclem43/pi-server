import express from "express";
import si from "systeminformation";
const app = express();
import { router as apiRouter } from "./api/api";
const port = 3000;

app.get("/", (req, res) => {
  res.send("Running!");
});

app.get("/status", async (req, res) => {
  const temp = await si.cpuTemperature();
  const memory = await si.mem();
  const uptime = si.time().uptime;
  res.json({ status: "OK", uptime, temp, memory });
});

app.use("/api", apiRouter);
app.listen(3000, "0.0.0.0", () => {
  return console.log(`Express is listening at http://0.0.0.0:${port}`);
});
