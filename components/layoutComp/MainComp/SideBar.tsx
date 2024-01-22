"use client";

import { Box, Text } from "@chakra-ui/react";
import Profile from "./SideBarComp/Profile";
import Category from "./SideBarComp/Category";
import Button from "@/components/element/CustomButton";
import { AuthContext } from "@/components/AuthProvider";
import { useContext } from "react";

const SideBar = () => {
  const { isAuthorized } = useContext(AuthContext);

  return (
    <Box width={"282px"} minHeight={"884px"} marginRight={"20px"}>
      <Profile />
      {isAuthorized ? (
        <Button
          fontSize={"24px"}
          fontFamily={"bold"}
          width={"100%"}
          height={"60px"}
          marginY={"12px"}
        >
          글쓰기
        </Button>
      ) : (
        <Text
          textAlign={"center"}
          marginY={"12px"}
          fontSize={"18px"}
          fontFamily={"regular"}
          letterSpacing={"-1px"}
        >
          로그인을 하셔야 글을 쓰실수 있습니다
        </Text>
      )}

      <Category />
    </Box>
  );
};

export default SideBar;
