import Image from "next/image";
import React, { useState } from "react";
import classes from "../styles/APost.module.css";
import {
  Delete,
  Heart,
  Info,
  MessageCircle,
  Repeat,
  Share,
  Trash,
} from "react-feather";
import Comments from "./Comments";
import { useRouter } from "next/router";
const APost = ({ post, posts, setPosts }) => {
  const [likes, setLikes] = useState(post.likes);
  const [postAlreadyLiked, setPostAlreadyLiked] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const router = useRouter();

  const likePostFunc = async () => {
    if (
      post.author._id ===
      JSON.parse(localStorage.getItem("userInformation"))._id
    ) {
      return alert(
        "Sorry. But as the author of this post you cant like your post"
      );
    }
    if (postAlreadyLiked) {
      await fetch("http://localhost:3005/api/unlikepost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes(data.likes);
          setPostAlreadyLiked(false);
        });
    } else {
      await fetch("http://localhost:3005/api/likepost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes(data.likes);
          setPostAlreadyLiked(true);
        });
    }
  };

  const deletePostFunc = async (post) => {
    if (
      post.author._id ===
      JSON.parse(localStorage.getItem("userInformation"))._id
    ) {
      if (confirm("Do you really want to delete your post")) {
        await fetch("http://localhost:3005/api/deletepost", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInformation")).token
            }`,
          },
          body: JSON.stringify({
            postId: post._id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data === "Only the person who creates a post can delete it") {
              return alert(data);
            }
            if (data == "could not delete this post") {
              return alert(data);
            }
            alert("Post deleted");
            setPosts(
              posts.filter((filteredPost) => filteredPost._id !== post._id)
            );
          });
      }
    } else {
      return alert(
        "YOu cant delete this post cause you are not the author of the post"
      );
    }
  };

  return (
    <div className={classes.a__post}>
      <div className={classes.postInfo}>
        <div>
          <Image src={post.author.profilePicture} height={35} width={35} />
          <div>
            <h4
              onClick={(e) => {
                if (
                  post.author._id ===
                  JSON.parse(localStorage.getItem("userInformation"))._id
                ) {
                  null;
                } else {
                  router.push(`/users/${post.author._id}`);
                }
              }}
            >
              {post.author.username}
            </h4>
            <p>{post.createdOn}</p>
          </div>
        </div>
            <Trash
          color="red"
          cursor={"pointer"}
          onClick={(e) => deletePostFunc(post)}
        />
       
      </div>
      <div className={classes.postContent}>
        <p>{post.content}</p>
        {post.image === "" && post.video === "" ? null : post.image !== "" &&
          post.video === "" ? (
          <Image src={post.image} height="300" width={"300"} />
        ) : (
          <video controls width={"100%"} height="300px" src={post.video} />
        )}
      </div>
      <div className={classes.postOtherInfo}>
        <div>
          <div>
            <Heart color="indigo" onClick={likePostFunc} cursor="pointer" />
            <p style={{ marginLeft: "5px" }}> {likes}</p>
          </div>
          <div onClick={(e) => setCommentVisible(!commentVisible)}>
            <MessageCircle cursor="pointer" />
          </div>
          <div>
            <Share cursor="pointer" />
          </div>
        </div>
        <Repeat cursor="pointer" />
      </div>
      {commentVisible ? <Comments postId={post._id} /> : null}
    </div>
  );
};

export default APost;
