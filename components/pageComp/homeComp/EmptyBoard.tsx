"use client";

import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const EmptyBoard = () => {
  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Image
        src={"/Logo&Graphic/emptyGraphic.svg"}
        width={346}
        height={291}
        alt='텅 빈 게시판'
      />
      <Text align={"center"} fontFamily={"bold"} fontSize={"40px"}>
        이런, 게시판이 비었어요! <br />
        어서 글을 써서 첫 게시물의 주인공이 돼주세요!
      </Text>
    </Flex>
  );
};

export default EmptyBoard;
