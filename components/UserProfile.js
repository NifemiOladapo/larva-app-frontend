import React, { useState } from "react";
import { useRouter } from "next/router";
import classes from "../styles/UserProfile.module.css";
import Image from "next/image";

const UserProfile = ({ userProfile }) => {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const sendFriendRequestFunc = async (e) => {
    e.preventDefault();

    if (
      userProfile._id ===
      JSON.parse(localStorage.getItem("userInformation"))._id
    ) {
      return alert("You cant send friend requests to yourlself");
    }
    if (
      JSON.parse(localStorage.getItem("userInformation")).friends.find(
        (friend) => friend._id === userProfile._id
      )
    ) {
      return alert(
        "This is your friend. You cant send a friendrequest to him/her "
      );
    }
    await fetch("http://localhost:3005/api/sendfriendrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
      body: JSON.stringify({
        toId: userProfile._id,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "You have an existing friend request") {
          return alert("You have an existing friend request with this uer");
        }
        setMessage("");
        router.push("/friendrequests");
      });
  };

  return (
    <div className={classes.userProfile}>
      <div className={classes.mostImportantInfo}>
        <Image src={userProfile.profilePicture} height={200} width={200} />
        <h1>{userProfile.username}</h1>
      </div>

      <form onSubmit={sendFriendRequestFunc}>
        <input
          className={classes.messageInput}
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Input friend request message.e.g About yourself"
        />
        <input
          style={{
            backgroundColor: "red",
            padding: "10px",
            borderWidth: 0,
            alignItems: "center",
            color: "white",
            cursor: "pointer",
          }}
          type="submit"
          value={"Send Friend Request"}
        ></input>
      </form>
      <div className={classes.aboutWrapper}>
        <h2>About</h2>
        <h3>Name : {userProfile.username}</h3>
        <h3>Email : {userProfile.email}</h3>
        <h3>Is Online : {`${userProfile.isOnline}`}</h3>
        <p>{userProfile.selfNote}</p>
      </div>
      <div className={classes.friendsWrapper}>
        <h2>Friends</h2>
        <div>
          {userProfile.friends.map((friend) => {
            return (
              <Image
                src={friend.profilePicture}
                height="50"
                width={"50"}
                style={{ cursor: "pointer" }}
                alt={`${friend.username} profile pic`}
                onClick={(e) => {
                  // console.log(friend);
                  router.push(`/users/${friend._id}`);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
