import Header from "@/components/Header";
import UserProfile from "@/components/UserProfile";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const aUser = ({ userProfile }) => {
  const router = useRouter();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInformation")) === null) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <UserProfile userProfile={userProfile} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let userProfile;
  await fetch(
    `http://localhost:3005/api/getauserprofile?userId=${context.params.username}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      userProfile = data;
    });
  return {
    props: {
      userProfile,
    },
  };
};

export default aUser;
