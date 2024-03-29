const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .catch((e) => console.error(e));

  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Post service: received event", event.type);

  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log("Started V55");
  console.log("Server is running on 4000");
});
