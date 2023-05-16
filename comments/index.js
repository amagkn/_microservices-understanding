const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostId[req.params.id] ?? []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    })
    .catch((e) => console.error(e));

  res.status(201).json(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("Comments service: received event", type);

  if (type === "CommentModerated") {
    const comments = commentsByPostId[data.postId];

    const comment = comments.find((c) => c.id === data.id);

    comment.status = data.status;

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id: data.id,
          content: data.content,
          postId: data.postId,
          status: data.status,
        },
      })
      .catch((e) => console.error(e));
  }

  res.sendStatus(200);
});
app.listen(4001, () => {
  console.log("Server is running on 4001");
});
