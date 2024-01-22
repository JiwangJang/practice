"use client";

import { Flex } from "@chakra-ui/react";
import SideBar from "./MainComp/SideBar";
import { AuthProvider } from "../AuthProvider";
import { useState } from "react";

const Main = ({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: React.ReactNode;
}) => {
  const [isAuthorized, setIsAuthorized] = useState(isAuth);

  return (
    <AuthProvider isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
      <Flex maxWidth={1200} width={"80%"} marginY={"20px"} marginX={"auto"}>
        <SideBar />
        {children}
      </Flex>
    </AuthProvider>
  );
};

export default Main;
