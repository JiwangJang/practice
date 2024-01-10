"use client";

import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
    font-family: 'Pretendard-Bold';
    src: url('/fonts/Pretendard-Bold.otf')
    
    }
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.otf');
    }
  `}
  />
);

export default Fonts;
