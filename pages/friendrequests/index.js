import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Delete, Minus, Plus, UserMinus, UserPlus } from "react-feather";
import classes from "../../styles/FriendRequests.module.css";
const friendrequests = () => {
  const router = useRouter();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInformation")) === null) {
      router.push("/");
    } else {
      getReceivedFriendRequests();
      getSentFriendRequests();
    }
  }, []);

  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
  const [sentFreindRequests, setSentFriendRequests] = useState([]);

  const getReceivedFriendRequests = async () => {
    await fetch("http://localhost:3005/api/recievedfriendrequests", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "could not fetch your friend requests") {
          return alert("could not fetch your friend requests");
        }
        setReceivedFriendRequests(data);
      });
  };

  const getSentFriendRequests = async () => {
    await fetch("http://localhost:3005/api/sentfriendrequests", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "could not fetch your friend requests") {
          return alert("could not fetch your friend requests");
        }
        setSentFriendRequests(data);
      });
  };

  const acceptFriendRequestFunc = async (friendRequestId) => {
    await fetch("http://localhost:3005/api/acceptfriendrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
      body: JSON.stringify({
        friendRequestId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "This friend request does not exist") {
          alert(data);
          getReceivedFriendRequests();
          getSentFriendRequests();
        } else if (data === "could not accept friend request") {
          alert(data);
          getReceivedFriendRequests();
          getSentFriendRequests();
        } else {
          alert("Friend Request Successfully Accepted");
          getReceivedFriendRequests();
          getSentFriendRequests();
        }
      });
  };

  const declinedeletefriendrequestFunc = async (friendRequestId) => {
    if (confirm("Delete friend request")) {
      await fetch("http://localhost:3005/api/deletefriendrequest", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendRequestId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data === "Friend request not found") {
            alert(data);
          }
          if (data === "Could not delete friend request") {
            alert(data);
          }
          getReceivedFriendRequests();
          getSentFriendRequests();
        });
    } else {
      null;
    }
  };

  return (
    <div>
      <Header />
      <div className={classes.friendrequests}>
        <div className={classes.receivedFriendRequests}>
          <h2>Received FriendRequests</h2>
          <div className={classes.userInfoWrapper}>
            {receivedFriendRequests.map((friendrequest) => {
              return (
                <div
                  key={friendrequest._id}
                  className={classes.friendRequestInfo}
                >
                  <div className={classes.userInfo}>
                    <Image
                      alt="user pic"
                      src={friendrequest.from.profilePicture}
                      height={80}
                      width={80}
                    />
                    <h2>{friendrequest.from.username}</h2>
                  </div>
                  <div className={classes.friendrequestsButtonsWrapper}>
                    <div
                      className={classes.btn1}
                      onClick={(e) => {
                        acceptFriendRequestFunc(friendrequest._id);
                      }}
                    >
                      <UserPlus />
                      <p>Accept Request</p>
                    </div>
                    <div
                      onClick={(e) => {
                        declinedeletefriendrequestFunc(friendrequest._id);
                      }}
                      className={classes.btn2}
                    >
                      <UserMinus />
                      <p>Decline Request</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.sentFriendRequests}>
          <h2>Sent FriendRequests</h2>
          <div className={classes.userInfoWrapper}>
            {sentFreindRequests.map((friendrequest) => {
              return (
                <div
                  key={friendrequest._id}
                  className={classes.friendRequestInfo}
                >
                  <div className={classes.userInfo}>
                    <Image
                      alt="user pic"
                      src={friendrequest.to.profilePicture}
                      height={80}
                      width={80}
                    />
                    <h2>{friendrequest.to.username}</h2>
                  </div>
                  <div className={classes.friendrequestsButtonsWrapper}>
                    <div
                      onClick={(e) => {
                        declinedeletefriendrequestFunc(friendrequest._id);
                      }}
                      className={classes.btn1}
                    >
                      <Delete />
                      <p>Delete Request</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default friendrequests;
