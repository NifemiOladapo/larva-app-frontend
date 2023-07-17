import React, { useState } from "react";
import { Heart } from "react-feather";
import classes from "../styles/Comments.module.css";

const AComment = ({ comment }) => {
  const [commentAlreadyLiked, setCommentAlreadyLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const likeCommentFunc = async () => {
    if (
      comment.author._id ===
      JSON.parse(localStorage.getItem("userInformation"))._id
    ) {
      return alert(
        "Sorry. But as the author of this comment you cant like your comment"
      );
    }
    if (commentAlreadyLiked) {
      await fetch("http://localhost:3005/api/unlikecomment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: comment._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes(data.likes);
          setCommentAlreadyLiked(false);
        });
    } else {
      await fetch("http://localhost:3005/api/likecomment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: comment._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes(data.likes);
          setCommentAlreadyLiked(true);
        });
    }
  };

  return (
    <div className={classes.commentInfo}>
      <div className={classes.mainInfo}>
        <h4>{comment.author.username}</h4>
        <p>{comment.content}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "5px" }}>{likes}</p>
        <Heart color="indigo" cursor={"pointer"} onClick={likeCommentFunc} />
      </div>
    </div>
  );
};

export default AComment;
