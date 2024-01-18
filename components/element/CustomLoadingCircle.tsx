"use client";

import { Center } from "@chakra-ui/react";

const CustomLoadingCircle = () => {
  return (
    <Center
      width={"100%"}
      height={"100%"}
      position={"fixed"}
      top={0}
      left={0}
      className='bgBlur'
    >
      <div
        style={{
          strokeDashoffset: "295px",
          strokeDasharray: "295px",
          animation: "loading 1.5s infinite",
          transformOrigin: "center",
        }}
      >
        <svg width='108' height='108' viewBox='0 0 108 108' fill='none'>
          <circle
            cx='54'
            cy='54'
            r='47'
            stroke='#000000'
            stroke-width='14'
            id='loading-circle'
          />
        </svg>
      </div>
    </Center>
  );
};

export default CustomLoadingCircle;
