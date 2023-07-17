import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LogOut, Power } from "react-feather";
import { SyncLoader } from "react-spinners";
import classes from "../../styles/Settings.module.css";

const settings = () => {
  const router = useRouter();
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [selfNote, setSelfNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInformation")) === null) {
      router.push("/");
    }
  }, []);

  const updateProfileFunc = async (e) => {
    e.preventDefault();
    if (newUsername === "" && newProfilePicture === "" && selfNote === "") {
      return;
    }
    await fetch("http://localhost:3005/api/updateprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
      body: JSON.stringify({
        newUsername,
        newProfilePicture,
        selfNote,
      }),
    })
      .then((res) => res.json())
      .then(data=>{
        console.log(data)
        if(data === "could not upadate this account"){
          return alert(data)
        }
        const userToken = JSON.parse(localStorage.getItem("userInformation")).token;
        localStorage.setItem("userInformation", JSON.stringify({
          username : data.username,
          email : data.email,
          friends : data.friends,
          isOnline : data.isOnline,
          profilePicture : data.profilePicture,
          selfNote : data.selfNote,
          createdOn : userToken.createdOn,
          _id : data._id,
          token : userToken
        }))
        alert("Update successful")
      });
  };

  const deleteAccountFunc = async () => {
    if (confirm("Delete Account")) {
      await fetch("http://localhost:3005/api/deleteaccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInformation")).token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === "could not delete account") {
            return alert(data);
          }
          localStorage.removeItem("userInformation");
          router.push("/");
        });
    } else {
      null;
    }
  };

  const logoutFunc = async () => {
    await fetch("http://localhost:3005/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("userInformation");
        router.push("/");
      });
  };

  return (
    <div>
      <Header />
      <div className={classes.settings}>
        <div
          onClick={logoutFunc}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "15px",
            cursor: "pointer",
            width: " fit-content",
          }}
        >
          <Power color="red" />
          <h3 style={{ marginLeft: "10px" }}>Log Out</h3>
        </div>
        <form onSubmit={updateProfileFunc}>
          <h2>Update Profile</h2>
          <div className={classes.topPart}>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Change Username"
            />
            <input
              onChange={async (e) => {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("upload_preset", "video-app");
                await fetch(
                  "https://api.cloudinary.com/v1_1/nifemioladapo/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setIsLoading(false);
                    setNewProfilePicture(data.secure_url);
                  });
              }}
              type={"file"}
              accept="image/*"
            />
          </div>
          <div className={classes.bottomPart}>
            <input
              value={selfNote}
              onChange={(e) => setSelfNote(e.target.value)}
              placeholder="About Yourself"
            />
          </div>
          {isLoading ? (
            <SyncLoader />
          ) : (
            <input type={"submit"} value="Update" />
          )}
        </form>
        <div className={classes.deleteDiv}>
          <h2>Delete Account</h2>
          <button onClick={deleteAccountFunc}>Delete This account</button>
        </div>
      </div>
    </div>
  );
};

export default settings;
