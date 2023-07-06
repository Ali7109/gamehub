import FetchGameData from "../backend-model/FetchGameData";

const GameDataAPIController = async () => {
  try {
    const data = await FetchGameData();
    return data;
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default GameDataAPIController;
