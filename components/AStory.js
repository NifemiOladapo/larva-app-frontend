import Image from "next/image";
import React from "react";
import classes from "../styles/AStory.module.css";

const AStory = ({ story }) => {
  return (
    <div className={classes.a__story}>
      <Image src="/favicon.ico" height={60} width={60} />
      <p>{story}</p>
    </div>
  );
};

export default AStory;
