// import { useToast } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import classes from "../styles/login.module.css";

const Home = () => {
  // const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const [isloading, setIsloading] = useState(false);
  const loginFunction = async (e) => {
    e.preventDefault();
    setIsloading(true);
    await fetch("http://localhost:3005/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsloading(false);

        if (data === "Could not find this account") {
          // return toast({
          //   status: "error",
          //   position: "top",
          //   duration: 5000,
          //   isClosable: true,
          //   description: data,
          // });
          return alert(data);
        }
        setEmail("");
        setPassword("");
        alert("User successfully loggedIn");
        // toast({
        //   status: "success",
        //   position: "top",
        //   duration: 5000,
        //   isClosable: true,
        //   description: "User successfully loged in",
        // });
        localStorage.setItem("userInformation", JSON.stringify(data));
        router.push("/homepage");
      });
  };

  return (
    <div className={classes.login}>
      <Head>
        <title>Nix-larva Log In page</title>
        <meta
          name="Nix-larva login page"
          content="This is the login page for the nix-larva app"
        />
      </Head>
      <form onSubmit={loginFunction}>
        <h1>Log In</h1>
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
          placeholder="Input Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isloading ? (
          <SyncLoader />
        ) : (
          <input
            className={classes.submit__button}
            type={"submit"}
            value="Login"
          />
        )}

        <div className={classes.registerDiv}>
          <p className={classes.registerLink}>Dont have an account?</p>
          <Link className={classes.link} href={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
