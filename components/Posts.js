import React, { Suspense, lazy, useEffect, useState } from "react";
import APost from "./APost";
import classes from "../styles/Posts.module.css";
const Posts = ({ posts, setPosts }) => {
  const LazyAPost= lazy(()=>import("./APost.js"))
  return (
    <div className={classes.posts}>
      {posts.map((post) => {
        return (
          <Suspense fallback={<p>Loading</p>}>
          <LazyAPost post={post} key={post._id} setPosts={setPosts} posts={posts} />

          </Suspense>
        );
      })}
    </div>
  );
};

export default Posts;
