import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const customDialogStyle = defineStyle({
  width: "772px",
  fontSize: "24px",
  fontFamily: "regular",
  paddingX: "50px",
  paddingY: "32px",
  maxHeight: "900px",
});

const customBodyStyle = defineStyle({
  overflowY: "auto",
});

const sizes = {
  myCustomSize: definePartsStyle({
    dialog: customDialogStyle,
    body: customBodyStyle,
  }),
};

export const modalTheme = defineMultiStyleConfig({
  sizes,
});
