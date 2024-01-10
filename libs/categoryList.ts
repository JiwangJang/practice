interface category {
  [key: string]: {
    category: string;
    title: string;
    name: string;
    key: number;
  };
}

const categoryList: category = {
  work: {
    category: "work",
    title: "업무관련글 둘러보기",
    name: "업무",
    key: 3842,
  },
  love: {
    category: "love",
    title: "사랑관련글 둘러보기",
    name: "사랑",
    key: 3245,
  },
  invest: {
    category: "invest",
    title: "투자관련글 둘러보기",
    name: "투자",
    key: 7342,
  },
  learning: {
    category: "learning",
    title: "자기계발관련글 둘러보기",
    name: "자기계발",
    key: 9232,
  },
  baby: {
    category: "baby",
    title: "육아관련글 둘러보기",
    name: "육아",
    key: 4963,
  },
  others: {
    category: "others",
    title: "나머지글 둘러보기",
    name: "그외이야기",
    key: 2935,
  },
  recent: {
    category: "recent",
    title: "최신글 둘러보기",
    name: "최신글",
    key: 2222,
  },
};

export default categoryList;
