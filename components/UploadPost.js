import Image from "next/image";
import { useEffect, useState } from "react";
import { Video, Camera } from "react-feather";
import classes from "../styles/UploadPost.module.css";
import { ClipLoader, SyncLoader } from "react-spinners";
import io from "socket.io-client";

const UploadPost = ({ setPosts, posts }) => {
  // const socket = io.connect("http://localhost:3005");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInformation")) {
      setUsername(JSON.parse(localStorage.getItem("userInformation")).username);
      setProfilePicture(
        JSON.parse(localStorage.getItem("userInformation")).profilePicture
      );
    }
  }, []);

  // useEffect(() => {
  //   socket.on("getpost", (postData) => {
  //     posts.unshift(postData);
  //     setPosts([...posts]);
  //   });
  // }, []);

  const uploadPostFunc = async () => {
    await fetch("http://localhost:3005/api/uploadpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformation")).token
        }`,
      },
      body: JSON.stringify({
        content,
        image,
        video,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "could not create this post") {
          return alert(data);
        }
        posts.unshift(data);
        setPosts([...posts]);
        setContent("");
        setImage("");
        setVideo("");
        // socket.emit("uploadpost", data);
      });
  };

  return (
    <>
      {isLoading ? (
        <SyncLoader />
      ) : (
        <form onSubmit={(e)=>{
          e.preventDefault()
          uploadPostFunc();
        }} className={classes.uploadPost}>
          <div className={classes.upperPart}>
            <Image src={profilePicture} height="35" width={"35"} />
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Say something ${username}`}
            />
          </div>
          <div className={classes.bottomPart}>
            <div className={classes.option1}>
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
                      setImage(data.secure_url);
                      setVideo("");
                      if(confirm("upload this post")){
                        uploadPostFunc();
                      }
                      setIsLoading(false);
                    });
                }}
                type={"file"}
                accept="image/*"
                id="pictureButton"
                style={{ display: "none" }}
              />
              <label htmlFor="pictureButton">
                <div>
                  <Camera color="red" />
                  <h3 style={{ marginLeft: "10px" }}>Picture</h3>
                </div>
              </label>
            </div>
            <div className={classes.option2}>
              <input
                onChange={async (e) => {
                  setIsLoading(true);
                  const formData = new FormData();
                  formData.append("file", e.target.files[0]);
                  formData.append("upload_preset", "video-app");

                  await fetch(
                    "https://api.cloudinary.com/v1_1/nifemioladapo/video/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setVideo(data.secure_url);
                      setImage("");
                      if(confirm("upload this post")){
                        uploadPostFunc();
                      }
                      setIsLoading(false);
                    });
                }}
                type={"file"}
                accept="video/*"
                id="videoButton"
                style={{ display: "none" }}
              />
              <label htmlFor="videoButton">
                <div>
                  <Video color="red" />
                  <h3 style={{ marginLeft: "10px" }}>Video</h3>
                </div>
              </label>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UploadPost;
