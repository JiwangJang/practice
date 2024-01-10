import { extendTheme } from "@chakra-ui/react";
import { modalTheme } from "./modalTheme";

const theme = extendTheme({
  colors: {
    PrimaryColor: {
      origin: "#33A0FF",
      variant: "#99CFFF",
      hover: "#006DCC",
    },
    SecondaryColor: {
      origin: "#FF9233",
      variant: "#FFC999",
    },
    BorderColor: "#CFD1D2",
    BlackFontColor: "#121212",
    GrayFontColor: "#6F7576",
    ErrorColor: "#FF0000",
  },
  fonts: {
    bold: `'Pretendard-Bold', sans-serif`,
    regular: `'Pretendard-Regular', sans-serif`,
  },
  styles: {
    global: {
      body: {
        letterSpacing: "-0.03em",
      },
    },
  },
  components: {
    Modal: modalTheme,
  },
});

export default theme;
