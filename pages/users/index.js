import Header from "@/components/Header";
import UserList from "@/components/UserList";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "../../styles/Users.module.css";
const users = ({ userList }) => {
  const router = useRouter();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInformation")) === null) {
      router.push("/");
    }
  }, []);

  const [searchText, setSearchText] = useState("");
  const [usersList, setUsersList] = useState(userList);
  const searchFunc = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3005/api/searchusers?query=${searchText}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "No users found") {
          return setUsersList([]);
        }
        setUsersList(data);
      });
  };

  return (
    <div>
      <Header />
      <div className={classes.users}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // backgroundColor: "red",
          }}
        >
          <form onSubmit={searchFunc}>
            <input
              className={classes.text}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Users"
            />
            <input
              className={classes.submitButton}
              type={"submit"}
              value="Search"
            />
          </form>
        </div>
        {usersList.length === 0 ? (
          <p>No Users Found</p>
        ) : (
          <UserList usersList={usersList} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let userList;
  await fetch("http://localhost:3005/api/users")
    .then((res) => res.json())
    .then((data) => {
      userList = data;
    });
  return {
    props: {
      userList,
    },
  };
};

export default users;
