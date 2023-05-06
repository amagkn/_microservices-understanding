const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Query service: received event", event.type);

  res.sendStatus(200);
});

app.post("/posts", (req, res) => {
  res.send({});
});

app.listen(4002, () => {
  console.log("Server is running on 4002");
});
