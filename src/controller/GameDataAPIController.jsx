import FetchGameData from "../backend-model/FetchGameData";

const GameDataAPIController = async (type) => {
  try {
    const data = await FetchGameData(type);
    return data;
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default GameDataAPIController;
