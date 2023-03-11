const initDial = (id, { percantage, unit }) => {
  const dial = document.getElementById(id);
  if (dial == null) {
    return;
  }
  const slice = document.createElement("div");
  slice.classList.add("slice");
  const bar = document.createElement("div");
  bar.classList.add("bar");
  const fill = document.createElement("div");
  fill.classList.add("fill");
  slice.appendChild(bar);
  slice.appendChild(fill);
  dial.appendChild(slice);

  const label = document.createElement("span");
  label.innerText = percantage + unit;
  dial.appendChild(label);
  dial.classList.add("c100");
  dial.classList.add("p" + percantage);
};

const updateDial = (id, { percantage, unit, dataShown }) => {
  if (dataShown == undefined) {
    dataShown = percantage;
  }
  if (percantage > 100) {
    return;
  }
  const dial = document.getElementById(id);
  if (dial == null) {
    return;
  }
  const span = dial.querySelector("span");
  if (span) {
    span.innerText = dataShown + unit;
  }
  if (percantage < 50) {
    dial.classList.add("green");
  } else if (percantage > 50) {
    dial.classList.add("orange");
  } else if (percantage > 80) {
    dial.classList.add("red");
  }

  dial.classList.remove("p" + dial.classList[1].substring(1));
  dial.classList.add("p" + Math.round(percantage));
};
const load = () => {
  initDial("temp", { percantage: 0, unit: "°C" }, "large", "red");
  initDial("ram", { percantage: 0, unit: "%" });
  getStatus();
  setInterval(getStatus, 1000);
};

const getStatus = () => {
  fetch("http://pi.local:3000/api/status")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.temp.max == undefined) {
        return;
      }
      const tempPercent = (data.temp.max / 80) * 100;
      updateDial("temp", {
        percantage: tempPercent,
        dataShown: parseFloat(data.temp.max).toFixed(2),
        unit: "°C",
      });
      const ramPercent = (data.memory.used / data.memory.total) * 100;
      if (ramPercent == null) {
        return;
      }
      updateDial("ram", {
        percantage: parseFloat(ramPercent).toFixed(2),
        unit: "",
        dataShown: formatBytes(data.memory.used),
      });
    });
};
function formatBytes(bytes, decimals = 0) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
