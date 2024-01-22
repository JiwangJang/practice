"use client";

import { Box } from "@chakra-ui/react";
import LoginForm from "./ProfileComp/LoginForm";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";
import ProfilePart from "./ProfileComp/ProfilePart";

const Profile = () => {
  const { isAuthorized } = useContext(AuthContext);

  return (
    <Box
      width={"100%"}
      minHeight={"318px"}
      borderWidth={"1px"}
      borderColor={"BorderColor"}
      borderRadius={"10px"}
      paddingX={"38px"}
      paddingY={"30px"}
    >
      {isAuthorized ? <ProfilePart /> : <LoginForm />}
    </Box>
  );
};

export default Profile;
