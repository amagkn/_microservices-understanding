import React, { useEffect, useState } from "react";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:4001/posts/${postId}/comments`);

    const data = await res.json();

    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
