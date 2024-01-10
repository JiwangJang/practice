"use client";

import Button from "@/components/element/CustomButton";
import CustomCheckbox from "@/components/element/CustomCheckbox";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const LoginForm = () => {
  const [checked, setChecked]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const signIn = () => {
    if (idRef.current == null || pwRef.current === null)
      return alert("내부오류가 생겼습니다. 새로고침해주세요");
    const id: string = idRef.current.value;
    const pw: string = pwRef.current.value;

    console.log("서버로 전송", { id, pw });
  };

  const toSignUp = () => router.push("/register-form");

  return (
    <FormControl>
      <FormLabel marginBottom={"4px"} fontFamily={"bold"}>
        아이디
      </FormLabel>
      <Input
        type='text'
        borderColor={"BorderColor"}
        height={"44px"}
        paddingX={"12px"}
        fontFamily={"regular"}
        ref={idRef}
      />
      <FormLabel marginBottom={"4px"} marginTop={"4px"} fontFamily={"bold"}>
        비밀번호
      </FormLabel>
      <Input
        type={checked ? "text" : "password"}
        borderColor={"BorderColor"}
        height={"44px"}
        paddingX={"12px"}
        fontFamily={"regular"}
        ref={pwRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") signIn();
          else return;
        }}
      />
      <CustomCheckbox
        isSmall={true}
        setChecked={setChecked}
        checked={checked}
        label='비밀번호 보기'
      />
      <Button
        height={"44px"}
        marginTop={"4px"}
        marginBottom={"4px"}
        onClick={signIn}
      >
        로그인
      </Button>
      <Button height={"44px"} isGhost={true} onClick={toSignUp}>
        회원가입
      </Button>
    </FormControl>
  );
};

export default LoginForm;
