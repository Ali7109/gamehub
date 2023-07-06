const FetchGameData = async () => {
  try {
    const cache = localStorage.getItem('gameData');
    if (cache) {
      return JSON.parse(cache);
    } else {
      const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}`);
      const jsonData = await response.json();
      localStorage.setItem('gameData', JSON.stringify(jsonData));
      return jsonData;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default FetchGameData;
