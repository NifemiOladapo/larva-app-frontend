import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "../styles/header.module.css";
import {
  Settings,
  Home,
  MessageCircle,
  Cloud,
  CloudSnow,
  Users,
  UserPlus,
  Video,
} from "react-feather";
import { useRouter } from "next/router";
const Header = () => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInformation");
    if (userInfo) {
      setUsername(JSON.parse(userInfo).username);
      setProfilePicture(JSON.parse(userInfo).profilePicture);
    }
  }, []);
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <h1>N</h1>
        <input
          placeholder="Search users"
          onClick={(e) => router.push("/users")}
        />
      </div>
      <div className={classes.header__center}>
        <div
          onClick={(e) => router.push("/homepage")}
          className={classes.option}
        >
          <Home color="indigo" />
          <p>Homepage</p>
        </div>
        <div className={classes.option}>
          <Video color="indigo" />
          <p>Videos</p>
        </div>
        <div
          onClick={(e) => router.push("/friendrequests")}
          className={classes.option}
        >
          <UserPlus color="indigo" />

          <p>Friend Requests</p>
        </div>
        <div onClick={(e) => router.push("/users")} className={classes.option}>
          <Users color="indigo" />
          <p>People</p>
        </div>
      </div>
      <div className={classes.header__right}>
        <h3>{username}</h3>
        <Image src={profilePicture} alt="profile pic" width="30" height="30" />
        <Settings
          style={{ cursor: "pointer" }}
          onClick={(e) => router.push("/settings")}
          color="indigo"
        />
      </div>
    </div>
  );
};

export default Header;
