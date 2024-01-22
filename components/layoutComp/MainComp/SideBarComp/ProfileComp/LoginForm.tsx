"use client";

import { AuthContext } from "@/components/AuthProvider";
import Button from "@/components/element/CustomButton";
import CustomCheckbox from "@/components/element/CustomCheckbox";
import CustomLoadingCircle from "@/components/element/CustomLoadingCircle";
import loadingTest from "@/libs/loadingTest";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";

const LoginForm = () => {
  const [checked, setChecked]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [isSignUpFormLoading, setIsSignUpFormLoading] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);

  const signIn = async () => {
    if (idRef.current == null || pwRef.current === null)
      return alert("내부오류가 생겼습니다. 새로고침해주세요");
    const id: string = idRef.current.value;
    const pw: string = pwRef.current.value;
    setIsSignInLoading(true);
    const res = await fetch("/api/users/signIn", {
      method: "POST",
      body: JSON.stringify({
        userId: id,
        userPw: pw,
      }),
    });

    const json = await res.json();

    if (json.isOk) {
      setIsAuthorized(true);
    } else {
      switch (json.msg) {
        case "pwError":
          alert("비밀번호를 확인해주세요");
          break;
        case "notFound":
          alert("등록되지 않은 사용자입니다");
          break;
        default:
          alert("서버에서 에러가 발생하였습니다, 잠시후 다시 시도해주세요");
          break;
      }
    }

    console.log(json);
    setIsSignInLoading(false);
  };

  const toSignUp = async () => {
    setIsSignUpFormLoading(true);
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
      {isSignUpFormLoading && <CustomLoadingCircle isBig={true} />}
      {isSignInLoading && <CustomLoadingCircle isBig={false} />}
    </FormControl>
  );
};

export default LoginForm;
