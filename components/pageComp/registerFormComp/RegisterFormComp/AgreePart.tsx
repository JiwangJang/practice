"use client";

import CustomCheckbox from "@/components/element/CustomCheckbox";
import { Box, useDisclosure } from "@chakra-ui/react";
import { MutableRefObject, useState } from "react";
import AgreeModal from "../AgreeModal";
import { PassCondition } from "../RegisterForm";

const AgreePart = ({
  passCondition,
}: {
  passCondition: MutableRefObject<PassCondition>;
}) => {
  const [allCheck, setAllCheck] = useState(false);
  const [contractCheck, setContractCheck] = useState(false);
  const [pvInfoCheck, setPvInfoCheck] = useState(false);
  const {
    isOpen: isContractOpen,
    onOpen: onContractOpen,
    onClose: onContractClose,
  } = useDisclosure();
  const {
    isOpen: isPvInfoOpen,
    onOpen: onPvInfoOpen,
    onClose: onPvInfoClose,
  } = useDisclosure();

  const allAgree = () => {
    if (!allCheck) {
      onPvInfoOpen();
      onContractOpen();
    }
    setContractCheck(!allCheck);
    setPvInfoCheck(!allCheck);
    passCondition.current = {
      ...passCondition.current,
      contract: !allCheck,
      privacy: !allCheck,
    };
  };

  const contractAgree = () => {
    if (!contractCheck) {
      onContractOpen();
    }
    setContractCheck(!contractCheck);
    passCondition.current = {
      ...passCondition.current,
      contract: !contractCheck,
    };
    if (pvInfoCheck) setAllCheck(!contractCheck);
  };

  const PvInfoAgree = () => {
    if (!pvInfoCheck) {
      onPvInfoOpen();
    }
    setPvInfoCheck(!pvInfoCheck);
    passCondition.current = {
      ...passCondition.current,
      privacy: !pvInfoCheck,
    };
    if (contractCheck) setAllCheck(!pvInfoCheck);
  };
  return (
    <Box>
      <CustomCheckbox
        isSmall={false}
        checked={allCheck}
        setChecked={setAllCheck}
        label='전체동의하기'
        isReverse={true}
        onClick={allAgree}
      />
      <CustomCheckbox
        isSmall={false}
        checked={contractCheck}
        setChecked={setContractCheck}
        label='이용약관동의'
        isReverse={true}
        onClick={contractAgree}
      />
      <CustomCheckbox
        isSmall={false}
        checked={pvInfoCheck}
        setChecked={setPvInfoCheck}
        label='개인정보수집 및 이용동의'
        isReverse={true}
        onClick={PvInfoAgree}
      />
      <AgreeModal
        isOpen={isContractOpen}
        onClose={onContractClose}
        isPv={false}
      />
      <AgreeModal isOpen={isPvInfoOpen} onClose={onPvInfoClose} isPv={true} />
    </Box>
  );
};

export default AgreePart;
