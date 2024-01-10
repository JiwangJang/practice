"use client";

import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
  return (
    <Flex
      width={"100%"}
      height={90}
      borderBottomWidth={1}
      borderBottomColor={"#CFD1D2"}
      justify={"center"}
      align={"center"}
    >
      <Box maxWidth={1200} width={"80%"}>
        <Image
          src={"/Logo&Graphic/Logo.svg"}
          width={90}
          height={64}
          alt='서비스로고'
        />
      </Box>
    </Flex>
  );
};

export default Header;
