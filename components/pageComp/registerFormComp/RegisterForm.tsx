"use client";

import CustomCheckbox from "@/components/element/CustomCheckbox";
import CustomInput from "@/components/element/CustomInput";
import { Flex, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import AgreePart from "./RegisterFormComp/AgreePart";
import CustomButton from "@/components/element/CustomButton";
import { useRouter } from "next/navigation";
import CustomLoadingCircle from "@/components/element/CustomLoadingCircle";

export interface PassCondition {
  password: boolean;
  contract: boolean;
  privacy: boolean;
  nickname: boolean;
  email: boolean;
  [key: string]: boolean;
}

const RegisterForm = () => {
  const [pwCheck, setPwCheck] = useState(false);
  const [pwErrorObj, setPwErrorObj] = useState({ error: false, msg: "" });
  const [nickErrorObj, setNickErrorObj] = useState({ error: false, msg: "" });
  const [verifyErrorObj, setVerifyErrorObj] = useState({
    error: false,
    msg: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const codeCountDownRef = useRef<HTMLDivElement>(null);
  const clientCodeRef = useRef<HTMLInputElement>(null);
  const intervalId = useRef<NodeJS.Timeout>();
  const passCondition = useRef<PassCondition>({
    password: false,
    contract: false,
    privacy: false,
    nickname: false,
    email: false,
  });
  const isSend = useRef<boolean>(false);

  const nicknameCheck = async () => {
    if (!(nicknameRef.current instanceof HTMLInputElement)) return;
    if (passCondition.current.nickname)
      return alert("이미 중복확인 하셨습니다");
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
      alert("입력하신 닉네임은 사용가능합니다");
      setNickErrorObj({ error: false, msg: "사용가능합니다" });
      nicknameRef.current.disabled = true;
      passCondition.current = {
        ...passCondition.current,
        nickname: true,
      };
    }
  };

  const sendEmail = async () => {
    if (!(emailRef.current instanceof HTMLInputElement)) return;
    if (passCondition.current.email) return alert("이미인증 하셨습니다");
    if (isSend.current) return alert("이미 발송했습니다");
    if (!emailRef.current.value) return alert("이메일을 입력해주세요");
    if (!/[a-z0-9]+@naver.com/.test(emailRef.current.value))
      return alert("공직자메일을 입력해주세요");

    alert("이메일을 발송했습니다. 1분정도 걸릴수 있습니다.");
    isSend.current = true;
    emailRef.current.disabled = true;

    const res = await fetch(
      `/api/users/emailCode?userEmail=${emailRef.current.value}`
    );
    const json = await res.json();

    if (json.isOk) {
      const end = new Date().setMinutes(new Date().getMinutes() + 2);
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        const distance = (end - new Date().getTime()) / 1000;
        if (!codeCountDownRef.current || !emailRef.current) return;
        codeCountDownRef.current.innerText = `${Math.trunc(
          distance / 60
        )}분 ${Math.floor(distance % 60)}초 남았습니다.`;
        if (distance < 0) {
          codeCountDownRef.current.innerText = `제한시간이 종료됐습니다`;
          emailRef.current.disabled = false;
          isSend.current = false;
          clearInterval(intervalId.current);
        }
      }, 1000);
    } else {
      switch (json.msg) {
        case "Internet":
          alert("인터넷을 확인해주세요");
          break;
        case "Not Sended":
          alert("메일주소를 다시 확인해주세요");
          break;
        case "redundant":
          alert("메일 한개당 한개의 계정만 만들수 있습니다");
          break;
        default:
          alert("서버에서 에러가 발생했습니다. 잠시후 다시 시도해주세요");
      }
      emailRef.current.disabled = false;
    }
  };

  const verify = async () => {
    if (!clientCodeRef.current || !emailRef.current)
      return alert("새로고침 부탁드립니다");
    if (passCondition.current.email) return alert("이미인증 하셨습니다");

    const result = await fetch("/api/users/emailCode/verify", {
      method: "POST",
      body: JSON.stringify({
        code: clientCodeRef.current.value,
        userId: emailRef.current.value,
      }),
    });

    const json = await result.json();

    if (json.isOk) {
      if (!codeCountDownRef.current) return;
      alert("인증번호가 일치합니다");
      codeCountDownRef.current.innerText = "인증완료";
      clientCodeRef.current.disabled = true;
      passCondition.current.email = true;
      setVerifyErrorObj({ error: false, msg: "인증완료" });
      clearInterval(intervalId.current);
    } else {
      setVerifyErrorObj({ error: true, msg: "인증번호가 다릅니다" });
    }
  };

  const pwChecker = () => {
    if (!pwRef.current || !pwCheckRef.current) return;
    if (pwRef.current.value !== pwCheckRef.current.value) {
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
    setIsLoading(true);
    try {
      Object.keys(passCondition.current).forEach((test) => {
        if (!passCondition.current[test]) {
          switch (test) {
            case "password":
              alert("비밀번호가 일치하지 않습니다");
              break;
            case "contract":
              alert("이용 약관에 동의해주세요");
              break;
            case "privacy":
              alert("개인정보이용약관에 동의해주세요");
              break;
            case "nickname":
              alert("닉네임중복 확인을 해주세요");
              break;
            case "email":
              alert("이메일인증을 해주세요");
              break;
          }
          throw Error;
        }
      });
      if (
        nicknameRef.current instanceof HTMLInputElement &&
        emailRef.current instanceof HTMLInputElement &&
        clientCodeRef.current instanceof HTMLInputElement &&
        pwCheckRef.current instanceof HTMLInputElement
      ) {
        const data = {
          nickname: nicknameRef.current.value,
          email: emailRef.current.value,
          password: pwCheckRef.current.value,
          verifyCode: clientCodeRef.current.value,
        };

        const res = await fetch("/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!json.isOk) {
          setIsLoading(false);
          alert("잠시후 다시시도해주세요");
        } else {
          alert("향후 로그인시 @korea.kr은 입력하시면 안됩니다");
          router.push("/recent", {});
        }
      }
    } catch (error) {
      setIsLoading(false);
      return alert("잠시후 다시시도해주세요");
    }
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
        title='공직자메일(아이디)'
        placeholder='인증받으실 공직자메일을 입력해주세요'
        buttonText={"인증코드발송"}
        buttonEvent={sendEmail}
        inputRef={emailRef}
        subTitleRef={codeCountDownRef}
      />
      <CustomInput
        title='인증코드발송'
        placeholder='받으신 인증코드를 2분이내에 입력해주세요'
        buttonEvent={verify}
        buttonText={"인증하기"}
        errorObj={verifyErrorObj}
        inputRef={clientCodeRef}
      />
      <CustomInput
        title='비밀번호'
        subTitle='비밀번호는 10자이하로 작성해주세요(영문, 숫자만 가능)'
        placeholder='사용하실 비밀번호를 입력해주세요'
        inputRef={pwRef}
        isText={pwCheck ? true : false}
        onChange={pwChecker}
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
      {isLoading && <CustomLoadingCircle isBig={true} />}
    </Flex>
  );
};

export default RegisterForm;
