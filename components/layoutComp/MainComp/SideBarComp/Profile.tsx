"use client";

import { Box, Center, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import LoginForm from "./ProfileComp/LoginForm";

const Profile = () => {
  return (
    <Center
      width={"100%"}
      height={"318px"}
      borderWidth={"1px"}
      borderColor={"BorderColor"}
      borderRadius={"10px"}
      paddingX={"38px"}
    >
      <LoginForm />
    </Center>
  );
};

export default Profile;
