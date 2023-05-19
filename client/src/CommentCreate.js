import React, { useState } from "react";

export default ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (content) {
      fetch(`http://posts.com/posts/${postId}/comments`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ content }),
      });

      setContent("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label style={{ marginBottom: "5px" }}>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
