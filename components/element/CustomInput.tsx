"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import { ChangeEvent, RefObject, useState } from "react";

interface Props {
  title: string;
  errorObj?: { error: boolean; msg: string };
  isText?: boolean;
  subTitle?: string | null;
  buttonText?: string | null;
  inputRef?: RefObject<HTMLInputElement> | null;
  placeholder?: string | undefined;
  subTitleRef?: RefObject<HTMLParagraphElement> | null;
  buttonEvent?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLElement>) => Promise<void>)
    | undefined;
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
}

const CustomInput = ({
  title,
  errorObj = { error: false, msg: "" },
  isText = true,
  subTitle = null,
  buttonText = null,
  inputRef = null,
  subTitleRef = null,
  placeholder = undefined,
  buttonEvent = undefined,
  onChange = undefined,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const onFocusEvent = () => setIsFocus(true);
  const onBlurEvent = () => setIsFocus(false);

  return (
    <Box color={errorObj.error ? "ErrorColor" : ""}>
      <Flex gap={"4px"} alignItems={"baseline"}>
        <Text fontSize={"20px"} fontFamily={"bold"}>
          {title}
        </Text>
        <Text fontFamily={"regular"} ref={subTitleRef}>
          {subTitle ?? errorObj.msg}
        </Text>
      </Flex>

      <Flex
        width={"100%"}
        height={"60px"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        fontFamily={"regular"}
        paddingLeft={"16px"}
        paddingRight={"12px"}
        marginTop={"6px"}
        gap={"36px"}
        borderColor={
          errorObj.error
            ? "ErrorColor"
            : isFocus
            ? "PrimaryColor.origin"
            : "BorderColor"
        }
      >
        <input
          style={{
            outline: "none",
            height: "100%",
            flexGrow: "1",
            fontSize: "18px",
          }}
          type={isText ? "text" : "password"}
          placeholder={placeholder}
          onFocus={onFocusEvent}
          onBlur={onBlurEvent}
          onChange={onChange}
          ref={inputRef}
        />
        {buttonText && (
          <CustomButton
            isGhost={true}
            height={"40px"}
            paddingX={"12px"}
            minWidth={"55px"}
            marginTop={"10px"}
            onClick={buttonEvent}
            borderColor={errorObj.error ? "ErrorColor" : "PrimaryColor.origin"}
            color={errorObj.error ? "ErrorColor" : "PrimaryColor.origin"}
            _hover={
              errorObj.error
                ? {
                    backgroundColor: "ErrorColor",
                    color: "white",
                  }
                : {
                    backgroundColor: "PrimaryColor.origin",
                    color: "white",
                  }
            }
          >
            {buttonText}
          </CustomButton>
        )}
      </Flex>
    </Box>
  );
};

export default CustomInput;
