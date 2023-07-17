import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "../styles/UserList.module.css";
const UserList = ({ usersList }) => {
  const router = useRouter();
  const [loggedInUserId, setLoggedInuserId] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userInformation")) {
      setLoggedInuserId(
        JSON.parse(localStorage.getItem("userInformation"))._id
      );
      console.log(loggedInUserId);
    }
  }, []);
  return (
    <div className={classes.userList}>
      {usersList.map((user) => {
        if (user._id !== loggedInUserId) {
          return (
            <div key={user._id}>
              <div>
                <Image
                  src={user.profilePicture}
                  alt={`${user.username} profilePic`}
                  width={"95"}
                  height={"95"}
                />
                <h1>{user.username}</h1>
              </div>
              <button onClick={(e) => router.push(`/users/${user._id}`)}>
                View Profile
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserList;
