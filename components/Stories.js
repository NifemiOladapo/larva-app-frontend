import React from "react";
import AStory from "./AStory";
import classes from "../styles/Stories.module.css";
const Stories = () => {
  const stories = [
    "nife",
    "dupe",
    "dami",
    "kola",
    "mummy",
    "daddy",
    "bro jj",
    "bro tony",
    "blessing",
    "blessing",
    "blessing",
    "blessing",
  ];
  return (
    <div className={classes.stories}>
      {stories.map((story) => {
        return <AStory story={story} />;
      })}
    </div>
  );
};

export default Stories;
