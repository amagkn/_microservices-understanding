const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log("Query service: received event", type);

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const comment = posts[postId].comments.find((c) => id === c.id);

    comment.status = status;
    comment.content = content;
  }

  res.sendStatus(200);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log("Server is running on 4002");
});
