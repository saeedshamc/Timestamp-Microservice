const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

function parseDate(param) {
  if (param === undefined || param === "") return new Date();
  if (/^-?\d+$/.test(param)) return new Date(Number(param));
  return new Date(param);
}

app.get("/api/:date?", (req, res) => {
  const date = parseDate(req.params.date);

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});