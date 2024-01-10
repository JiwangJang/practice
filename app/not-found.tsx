import Chakra from "@/components/chakraComp/ChakraProvider";
import Fonts from "@/components/chakraComp/Fonts";
import Footer from "@/components/layoutComp/Footer";
import Header from "@/components/layoutComp/Header";
import { Flex, Link, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 190px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Pretendard-bold",
        gap: "10px",
        userSelect: "none",
      }}
    >
      <Text fontSize={"50px"}>찾으시는 페이지는 없는 페이지입니다</Text>
      <Link
        href='/recent'
        paddingX={"40px"}
        paddingY={"15px"}
        backgroundColor={"PrimaryColor.origin"}
        fontSize={"36px"}
        color={"white"}
        borderRadius={"10px"}
        _hover={{
          textDecoration: "none",
          bg: "PrimaryColor.hover",
        }}
      >
        홈페이지로 가기
      </Link>
    </div>
  );
};

export default NotFound;
