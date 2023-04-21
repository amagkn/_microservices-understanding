const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const posts = require("./posts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", (_, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log("Server is running on 4000");
});
