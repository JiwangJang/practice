import { Box, BoxProps, Center } from "@chakra-ui/react";

interface ButtonProps extends BoxProps {
  isGhost?: boolean;
  children: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLElement>) => Promise<void>);
}

const CustomButton = ({
  isGhost = false,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Center
      borderRadius={10}
      fontFamily={isGhost ? "regular" : "bold"}
      color={isGhost ? "PrimaryColor.origin" : "white"}
      backgroundColor={isGhost ? "transparent" : "PrimaryColor.origin"}
      borderColor={isGhost ? "PrimaryColor.origin" : "transparent"}
      borderWidth={"1px"}
      cursor={"pointer"}
      transition={"0.2s ease-in-out"}
      _hover={
        isGhost
          ? {
              backgroundColor: "PrimaryColor.origin",
              color: "white",
            }
          : {
              backgroundColor: "PrimaryColor.hover",
            }
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </Center>
  );
};

export default CustomButton;
