import express from "express";
import si from "systeminformation";
export const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running!");
});
router.get("/status", async (req, res) => {
  const temp = await si.cpuTemperature();
  const memory = await si.mem();
  const uptime = si.time().uptime;
  res.json({ status: "OK", uptime, temp, memory });
});
