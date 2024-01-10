"use client";

import CustomCheckbox from "@/components/element/CustomCheckbox";
import CustomInput from "@/components/element/CustomInput";
import { Flex, Text } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import AgreePart from "./RegisterFormComp/AgreePart";
import CustomButton from "@/components/element/CustomButton";

export interface PassCondition {
  password: boolean;
  contract: boolean;
  privacy: boolean;
  nickname: boolean;
  email: boolean;
}

const RegisterForm = () => {
  const [pwCheck, setPwCheck] = useState(false);
  const [pwErrorObj, setPwErrorObj] = useState({ error: false, msg: "" });
  const [nickErrorObj, setNickErrorObj] = useState({ error: false, msg: "" });
  const [verifyErrorObj, setVerifyErrorObj] = useState({
    error: false,
    msg: "",
  });

  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const codeCountDownRef = useRef<HTMLDivElement>(null);
  const clientCodeRef = useRef<HTMLInputElement>(null);
  const verifyCode = useRef<number | undefined>();
  const intervalId = useRef<NodeJS.Timeout>();
  const passCondition = useRef<PassCondition>({
    password: false,
    contract: false,
    privacy: false,
    nickname: false,
    email: false,
  });

  const nicknameCheck = async () => {
    if (!(nicknameRef.current instanceof HTMLInputElement)) return;
    const nickname = nicknameRef.current.value;
    if (nickname.length > 9) {
      setNickErrorObj({
        ...nickErrorObj,
        error: true,
        msg: "닉네임이 너무 깁니다",
      });
      return;
    }
    if (!nickname) {
      setNickErrorObj({
        ...nickErrorObj,
        error: true,
        msg: "적어도 1자이상 입력해주셔야 합니다",
      });
      return;
    }
    const data = await fetch("/api/users/userlist");
    const userList = await data.json();
    if (!userList.isOk)
      return alert("서버에서 오류가 발생했습니다. 잠시후 다시시도해주세요");
    const { nicknameList } = userList;
    if (nicknameList.includes(nickname)) {
      setNickErrorObj({
        error: true,
        msg: "다른 닉네임을 사용해주세요",
      });
      passCondition.current = {
        ...passCondition.current,
        nickname: false,
      };
    } else {
      setNickErrorObj({ error: false, msg: "사용가능합니다" });
      passCondition.current = {
        ...passCondition.current,
        nickname: true,
      };
    }
  };

  const emailVerify = async () => {
    if (!(emailRef.current instanceof HTMLInputElement)) return;
    if (!emailRef.current.value) return alert("이메일을 입력해주세요");
    alert("이메일을 발송했습니다. 1분정도 시간이 걸릴수 있습니다.");

    const res = await fetch(
      `/api/users/verify?userEmail=${emailRef.current.value}`
    );
    const json = await res.json();

    if (json.isOk) {
      const end = new Date().setMinutes(new Date().getMinutes() + 2);
      clearInterval(intervalId.current);
      verifyCode.current = json.verifyCode;
      intervalId.current = setInterval(() => {
        const distance = (end - new Date().getTime()) / 1000;
        if (!codeCountDownRef.current) return;
        codeCountDownRef.current.innerText = `${Math.trunc(
          distance / 60
        )}분 ${Math.floor(distance % 60)}초 남았습니다.`;
        if (distance < 0) {
          codeCountDownRef.current.innerText = `제한시간이 종료됐습니다`;
          clearInterval(intervalId.current);
          verifyCode.current = undefined;
        }
      }, 1000);
      /**
       * 인증되면 시간종료 없애는 기능 추가
       */
    } else {
      switch (json.msg) {
        case "Internet":
          alert("인터넷을 확인해주세요");
          break;
        case "Not Sended":
          alert("메일주소를 다시 확인해주세요");
          break;
        default:
          alert("서버에서 에러가 발생했습니다. 잠시후 다시 시도해주세요");
      }
    }
  };

  const verify = () => {
    if (!(clientCodeRef.current instanceof HTMLInputElement)) return;
    const clientCode = clientCodeRef.current.value;
    if (clientCode == String(verifyCode.current)) {
      setVerifyErrorObj({ error: false, msg: "인증번호가 일치합니다" });
      passCondition.current = {
        ...passCondition.current,
        email: true,
      };
    } else {
      setVerifyErrorObj({ error: true, msg: "인증번호가 다릅니다" });
      passCondition.current = {
        ...passCondition.current,
        email: false,
      };
    }
  };

  const pwChecker = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pwRef.current) return;
    if (pwRef.current.value !== e.target.value) {
      setPwErrorObj({ error: true, msg: "비밀번호가 다릅니다" });
      passCondition.current = {
        ...passCondition.current,
        password: false,
      };
    } else {
      setPwErrorObj({
        error: false,
        msg: "비밀번호가 일치합니다",
      });
      passCondition.current = {
        ...passCondition.current,
        password: true,
      };
    }
  };

  const signUp = async () => {
    console.log(passCondition.current);
    // const result = await fetch("/api/users/signup", {
    //   method: "POST",
    //   headers: {
    //     // 나중에 실제 회원가입 기능 구현시 form데이터 형식으로 바꾸기
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <Flex
      width={"732px"}
      paddingY={"32px"}
      paddingX={"95px"}
      direction={"column"}
      justifyContent={"center"}
      borderRadius={"10px"}
      borderColor={"BorderColor"}
      borderWidth={"1px"}
      marginY={"20px"}
      gap={"12px"}
    >
      <Text fontSize={"42px"} fontFamily={"bold"}>
        회원가입
      </Text>
      <CustomInput
        title='닉네임(공백포함 8자이하)'
        placeholder='사용하실 닉네임을 입력해주세요'
        buttonText={"중복확인"}
        buttonEvent={nicknameCheck}
        errorObj={nickErrorObj}
        inputRef={nicknameRef}
      />
      <CustomInput
        title='이메일(아이디)'
        placeholder='인증받으실 이메일을 입력해주세요'
        buttonText={"인증번호발송"}
        buttonEvent={emailVerify}
        inputRef={emailRef}
        subTitleRef={codeCountDownRef}
      />
      <CustomInput
        title='인증번호입력'
        placeholder='받으신 인증번호를 2분이내에 입력해주세요'
        buttonText={"인증"}
        buttonEvent={verify}
        errorObj={verifyErrorObj}
        inputRef={clientCodeRef}
      />
      <CustomInput
        title='비밀번호'
        subTitle='비밀번호는 영문10자이하로 작성해주세요(특수문자, 한글 불가능)'
        placeholder='사용하실 비밀번호를 입력해주세요'
        inputRef={pwRef}
        isText={pwCheck ? true : false}
      />
      <CustomInput
        title='비밀번호확인'
        placeholder='비밀번호를 다시 한 번 입력해주세요'
        inputRef={pwCheckRef}
        isText={pwCheck ? true : false}
        errorObj={pwErrorObj}
        onChange={pwChecker}
      />
      <CustomCheckbox
        isSmall={true}
        checked={pwCheck}
        setChecked={setPwCheck}
        label='비밀번호보이기'
      />
      <AgreePart passCondition={passCondition} />
      <CustomButton height={"68px"} fontSize={"24px"} onClick={signUp}>
        회원등록하기
      </CustomButton>
    </Flex>
  );
};

export default RegisterForm;
