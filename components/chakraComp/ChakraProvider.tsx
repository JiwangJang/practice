"use client";

import theme from "@/libs/theme";
import { ChakraProvider } from "@chakra-ui/react";

const Chakra = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Chakra;
