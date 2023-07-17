import React from "react";
import classes from "../styles/CenterMainPage.module.css";
import Posts from "./Posts";
import Stories from "./Stories";
import UploadPost from "./UploadPost";
const CenterMainPage = ({ posts, setPosts }) => {
  return (
    <div className={classes.center__main__page}>
      {/* <Stories /> */}
      <div>
        <UploadPost posts={posts} setPosts={setPosts} />
      </div>
      <div style={{ marginTop: "30px", flex: 1 }}>
        <Posts posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
};

export default CenterMainPage;
