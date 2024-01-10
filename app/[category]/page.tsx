import BoardHeader from "@/components/pageComp/homeComp/BoardHeader";
import EmptyBoard from "@/components/pageComp/homeComp/EmptyBoard";
import categoryList from "@/libs/categoryList";
import { Flex } from "@chakra-ui/react";
import { notFound } from "next/navigation";

const Page = ({ params }: { params: { category: string } }) => {
  const categoryKeyList = Object.keys(categoryList);
  if (!categoryKeyList.includes(params.category)) {
    return notFound();
  }

  const data = null;
  return (
    <Flex flexGrow={1} direction={"column"} gap={"16px"}>
      <BoardHeader type={params.category} />
      {!data ? <EmptyBoard /> : "나중에 개발"}
    </Flex>
  );
};

export default Page;
