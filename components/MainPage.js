import React from "react";
import CenterMainPage from "./CenterMainPage";
import LeftMainPage from "./LeftMainPage";
import RightMainPage from "./RightMainPage";
import classes from "../styles/Mainpage.module.css";
import { Upload } from "react-feather";

const MainPage = ({ posts, setPosts }) => {
  return (
    <div className={classes.mainpage}>
      {/* <LeftMainPage /> */}
      <CenterMainPage posts={posts} setPosts={setPosts} />
      {/* <RightMainPage /> */}
      <div
        style={{
          position: "absolute",
          top: "80dvh",
          left: "80dvw",
          backgroundColor: "red",
          padding: "20px",
          color: "white",
          cursor: "pointer",
          borderRadius: "100px",
        }}
      >
        <Upload />
      </div>
    </div>
  );
};

export default MainPage;
