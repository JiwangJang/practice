import { Flex } from "@chakra-ui/react";
import SideBar from "./MainComp/SideBar";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex maxWidth={1200} width={"80%"} marginY={"20px"} marginX={"auto"}>
      <SideBar />
      {children}
    </Flex>
  );
};

export default Main;
