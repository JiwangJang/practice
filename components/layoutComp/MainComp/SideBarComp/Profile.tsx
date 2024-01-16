"use client";

import { Box, Center, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import LoginForm from "./ProfileComp/LoginForm";

const Profile = () => {
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
      <LoginForm />
    </Box>
  );
};

export default Profile;
