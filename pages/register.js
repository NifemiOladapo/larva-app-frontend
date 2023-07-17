import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "../styles/register.module.css";
import { SyncLoader } from "react-spinners";

const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const registerationFunction = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (password !== confirmpassword) {
      return alert("Passwords dont match");
    }
    await fetch("http://localhost:3005/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        profilePicture:
          profilePicture === ""
            ? "https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
            : profilePicture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsloading(false);
        if (data === "This email is already in use") {
          return alert(data);
        }
        if (data === "User not created") {
          return alert(data);
        }
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        setProfilePicture("");
        alert("User Successfuly registered");
        localStorage.setItem("userInformation", JSON.stringify(data));
        router.push("/homepage");
      });
  };
  return (
    <div className={classes.register}>
      <Head>
        <title>Nix-larva registration page</title>
        <meta
          name="Nix-larva registration"
          content="This is the registration page for the nix-larva app"
        />
      </Head>
      <form onSubmit={registerationFunction}>
        <h1>Register</h1>
        <input
          className={classes.input}
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Input Username"
          required
        />
        <input
          className={classes.input}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Input Email"
          required
        />
        <input
          className={classes.input}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Input Password"
          required
        />
        <input
          className={classes.input}
          type={"password"}
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          placeholder="Confirm password"
          required
        />
        <input
          className={classes.input}
          type={"file"}
          accept="image/*"
          onChange={async (e) => {
            setIsloading(true);
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
                console.log(data.secure_url.toString())
                setIsloading(false);
                setProfilePicture(data.secure_url);
              });
          }}
        />
        {isLoading ? (
          <SyncLoader />
        ) : (
          <input
            className={classes.submit__button}
            type={"submit"}
            value="Register"
          />
        )}
        <div className={classes.loginDiv}>
          <p className={classes.loginLink}>Already have an account?</p>
          <Link className={classes.link} href={"/"}>
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
