"use client";

import { Box, Flex, Image } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CategoryRow = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname().replace(/\//g, "");
  const router = useRouter();
  const onMouseOverEvent = () => setIsHover(true);
  const onMouseLeaveEvent = () => setIsHover(false);

  return (
    <Flex
      height={"70px"}
      align={"center"}
      fontSize={"20px"}
      borderColor={"BorderColor"}
      borderBottomWidth={"1px"}
      cursor={"pointer"}
      onMouseOver={onMouseOverEvent}
      onMouseLeave={onMouseLeaveEvent}
      onClick={() => router.push(`/${category}`, { scroll: false })}
    >
      <Box
        width={"10px"}
        height={"100%"}
        bgColor={
          isHover || pathname === category
            ? "SecondaryColor.variant"
            : "transparent"
        }
        marginRight={"14px"}
        transition={"0.2s ease-in-out"}
      />
      <Image
        alt='카테고리 이모지'
        height={"25px"}
        width={"25px"}
        marginRight={"8px"}
        src={`/emojis/${category}.svg`}
      />
      {name}
    </Flex>
  );
};

export default CategoryRow;
