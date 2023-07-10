import FetchGameData from "../backend-model/FetchGameData";

const GameDataAPIController = async (type, parameters="") => {
  try {
    const data = await FetchGameData(type,parameters);
    return data;
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default GameDataAPIController;
