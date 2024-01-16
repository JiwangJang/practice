"use client";

import CustomCheckbox from "@/components/element/CustomCheckbox";
import CustomInput from "@/components/element/CustomInput";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

const FindForm = () => {
  const [isVerify, setIsVerify] = useState(true);
  const [isSee, setIsSee] = useState(false);
  return (
    <Flex gap={"12px"} direction={"column"}>
      <CustomInput title='이메일' buttonText={"확인"} />
      <CustomInput title='인증번호' buttonText={"인증"} />
      {isVerify && (
        <>
          <CustomInput
            title='새 비밀번호'
            subTitle={"10자 이하로 작성해주세요(숫자, 영문만 가능)"}
            buttonText={"변경"}
            isText={isSee}
          />
          <CustomCheckbox
            isSmall={true}
            label='비밀번호보기'
            checked={isSee}
            setChecked={setIsSee}
            paddingRight={"4px"}
            marginTop={"0px"}
          />
        </>
      )}
    </Flex>
  );
};

export default FindForm;
