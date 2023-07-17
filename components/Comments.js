import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heart } from "react-feather";
import classes from "../styles/Comments.module.css";
import AComment from "./AComment";

const Comments = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/api/getcomments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === "could not fetch comments") {
          return alert(data);
        }
        setComments(data);
      });
  }, []);

  const commentFunc = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3005/api/commenttopost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
      body: JSON.stringify({
        postId,
        content: commentText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "could not comment to this post") {
          return alert(data);
        }
        comments.unshift(data);
        setComments([...comments]);
        setCommentText("");
      });
  };

  return (
    <div className={classes.comments}>
      <form onSubmit={commentFunc} className={classes.upperPart}>
        <Image
          src={
            JSON.parse(localStorage.getItem("userInformation")).profilePicture
          }
          height={30}
          width={30}
        />
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment"
        />
      </form>
      <div className={classes.bottomPart}>
        {comments.map((comment) => {
          return <AComment comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
