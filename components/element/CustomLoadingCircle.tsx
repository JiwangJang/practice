"use client";

import { Center } from "@chakra-ui/react";

const CustomLoadingCircle = ({ isBig }: { isBig: boolean }) => {
  return (
    <Center
      position={isBig ? "fixed" : "absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      className={isBig ? "bgBlur" : ""}
      borderRadius={isBig ? "" : "10px"}
      bgColor={isBig ? "" : "white"}
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
