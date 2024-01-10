"use client";

import { Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isSmall: boolean;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  label: string;
  onClick?: (() => void) | null;
  isReverse?: boolean;
}

const CustomCheckbox = ({
  isSmall,
  setChecked,
  checked,
  label,
  onClick,
  isReverse,
}: Props) => {
  return (
    <Flex
      width={"100%"}
      justifyContent={isReverse ? "left" : "right"}
      marginTop={"4px"}
    >
      <Flex
        cursor='pointer'
        alignItems={"center"}
        direction={isReverse ? "row-reverse" : "row"}
        gap={"4px"}
        onClick={() => {
          setChecked(!checked);
          if (onClick) onClick();
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: isSmall ? "15px" : "24px",
          }}
        >
          {label}
        </span>
        <div
          style={{
            background: "url(/Icons/checkboxpair.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: isSmall ? "36px" : "64px",
            backgroundPosition: checked
              ? isSmall
                ? "-18px 0px"
                : "-32px 0px"
              : "0px 0px",
            width: isSmall ? "18px" : "32px",
            height: isSmall ? "18px" : "32px",
          }}
        ></div>
      </Flex>
    </Flex>
  );
};

export default CustomCheckbox;
