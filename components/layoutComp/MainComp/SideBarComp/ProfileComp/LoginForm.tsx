"use client";

import Button from "@/components/element/CustomButton";
import CustomCheckbox from "@/components/element/CustomCheckbox";
import CustomLoadingCircle from "@/components/element/CustomLoadingCircle";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const LoginForm = () => {
  const [checked, setChecked]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const toSignUp = async () => {
    setIsLoading(true);
    router.push("/register-form");
  };

  return (
    <FormControl position={"relative"}>
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginTop: "4px",
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard-Regular",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            const top = window.innerHeight / 2 - 250;
            const left = window.innerWidth / 2 - 300;
            const options = `width=600, height=500, location=no, status=no, top=${top}, left=${left}`;
            window.open("/password-find", "passwordFind", options);
          }}
        >
          비밀번호찾기
        </span>
      </div>
      {isLoading && <CustomLoadingCircle />}
    </FormControl>
  );
};

export default LoginForm;
