import CustomInput from "@/components/element/CustomInput";
import FindForm from "@/components/pageComp/passwordFindComp/FindForm";
import { Box, Text } from "@chakra-ui/react";

const Page = () => {
  return (
    <Box
      width={"80%"}
      margin={"auto"}
      // minHeight={410}
      marginY={"20px"}
      borderColor={"borderColor"}
      borderWidth={1}
      borderRadius={10}
      fontFamily={"regular"}
      paddingX={"36px"}
      paddingY={"30px"}
    >
      <Text fontSize={28} fontFamily={"bold"}>
        비밀번호 찾기
      </Text>
      <FindForm />
    </Box>
  );
};

export default Page;
