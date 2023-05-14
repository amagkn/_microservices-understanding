const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  res.sendStatus(200);
});

app.post("/posts", (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log("Server is running on 4002");
});
