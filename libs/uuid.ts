const getUuid = () => {
  const getNumber = () => Math.floor(Math.random() * 9);
  return `${getNumber()}${getNumber()}${getNumber()}${getNumber()}${getNumber()}${getNumber()}${getNumber()}${getNumber()}`;
};

export default getUuid;
