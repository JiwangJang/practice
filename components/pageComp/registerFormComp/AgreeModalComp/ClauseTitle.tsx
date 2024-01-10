import { Text } from "@chakra-ui/react";

const ClauseTitle = ({ children }: { children: String }) => {
  return (
    <Text fontSize={26} fontFamily={"bold"}>
      {children}
    </Text>
  );
};
export default ClauseTitle;
