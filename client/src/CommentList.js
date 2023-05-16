import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = "";
    const style = {};

    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;
      case "rejected":
        style.color = "red";
        content = "This comment has been rejected";
        break;
      case "pending":
        style.color = "purple";
        content = "This comment is awaiting moderation";
        break;
    }

    return (
      <li style={style} key={comment.id}>
        {content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};
