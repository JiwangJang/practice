"use client";

import categoryList from "@/libs/categoryList";
import { Text, Image, Flex } from "@chakra-ui/react";

const BoardHeader = ({ type }: { type: string }) => {
  const { category, title } = categoryList[type];

  return (
    <Flex alignItems={"center"} gap={"10px"}>
      <Image
        src={category ? `/emojis/${category}.svg` : "/emojis/recent.svg"}
        width={46}
        height={46}
        alt={"카테고리 이모지"}
      />
      <Text fontSize={"40px"} fontFamily={"bold"}>
        {title ?? "최신글 둘러보기"}
      </Text>
    </Flex>
  );
};

export default BoardHeader;
