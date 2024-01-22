const loadingTest = async (second: number): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log(`${second}만큼 기다림 ㅋㅋ`);
      resolve();
    }, second * 1000);
  });
};
export default loadingTest;
