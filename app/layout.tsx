import Chakra from "@/components/chakraComp/ChakraProvider";
import Fonts from "@/components/chakraComp/Fonts";
import Footer from "@/components/layoutComp/Footer";
import Header from "@/components/layoutComp/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <head>
        <title>여수속마음</title>
      </head>
      <body>
        <Chakra>
          <Fonts />
          <Header />
          {/* 헤더 하단마진 30px */}
          {children}
          {/* 메인 하단마진 30px */}
          <Footer />
        </Chakra>
      </body>
    </html>
  );
}
