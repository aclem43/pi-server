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

const updateDial = (id, { percantage, unit }) => {
  const dial = document.getElementById(id);
  if (dial == null) {
    return;
  }
  const span = dial.querySelector("span");
  if (span) {
    span.innerText = percantage + unit;
  }

  dial.classList.remove("p" + dial.classList[1].substring(1));
  dial.classList.add("p" + Math.round(percantage));
};
const load = () => {
  initDial("temp", { percantage: 0, unit: "°C" }, "large", "red");
  initDial("ram", { percantage: 0, unit: "%" });
  getStatus();
};

const getStatus = () => {
  fetch("http://pi.local:3000/api/status")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.temp.max == undefined) {
        return;
      }
      updateDial("temp", {
        percantage: parseFloat(data.temp.max).toFixed(2),
        unit: "°C",
      });
      const ramPercent = (data.memory.used / data.memory.total) * 100;
      if (ramPercent == null) {
        return;
      }
      updateDial("ram", {
        percantage: parseFloat(ramPercent).toFixed(2),
        unit: "%",
      });
    });
};
