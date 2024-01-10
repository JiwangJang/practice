import { Box } from "@chakra-ui/react";
import Profile from "./SideBarComp/Profile";
import Category from "./SideBarComp/Category";
import Button from "@/components/element/CustomButton";

const SideBar = () => {
  return (
    <Box width={"282px"} height={"884px"} marginRight={"20px"}>
      <Profile />
      <Button
        fontSize={"24px"}
        fontFamily={"bold"}
        width={"100%"}
        height={"60px"}
        marginY={"12px"}
      >
        글쓰기
      </Button>
      <Category />
    </Box>
  );
};

export default SideBar;
