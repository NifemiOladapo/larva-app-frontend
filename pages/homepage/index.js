import Header from "@/components/Header";
import MainPage from "@/components/MainPage";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Upload } from "react-feather";

const homepage = ({ postsList }) => {
  const [posts, setPosts] = useState(postsList);
  const router = useRouter();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInformation")) === null) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Nix-larva homepage</title>
        <meta
          name="Nix-larva home page"
          content="This is the homepage for the nix-larva web app"
        />
      </Head>
      <Header />
      <MainPage posts={posts} setPosts={setPosts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  let postsList;
  await fetch("http://localhost:3005/api/posts")
    .then((res) => res.json())
    .then((data) => {
      postsList = data;
    });
  return {
    props: {
      postsList,
    },
  };
};

export default homepage;
