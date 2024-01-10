"use client";

import { Box, Flex } from "@chakra-ui/react";
import CategoryRow from "./CategoryComp/CategoryRow";
import categoryList from "@/libs/categoryList";

const Category = () => {
  const categoryKeyList = Object.keys(categoryList);

  return (
    <Box fontFamily={"regular"}>
      <Flex
        align={"center"}
        height={"52px"}
        backgroundColor={"SecondaryColor.variant"}
        fontFamily={"bold"}
        borderTopRadius={"10px"}
        paddingLeft={"24px"}
        fontSize={"22px"}
      >
        카테고리
      </Flex>
      {categoryKeyList.map((objKey: string) => {
        if (objKey === "recent") return;
        return (
          <CategoryRow
            category={categoryList[objKey].category}
            name={categoryList[objKey].name}
            key={categoryList[objKey].key}
          />
        );
      })}
    </Box>
  );
};

export default Category;
