
const FetchGameData = async (type) => {
  try {
    const cache = localStorage.getItem(`${type}Data`);
    if (cache) {
      return JSON.parse(cache);
    } else {
      const response = await fetch(`https://api.rawg.io/api/${type}?key=${process.env.REACT_APP_API_KEY}`);
      const jsonData = await response.json();
      localStorage.setItem(`${type}Data`, JSON.stringify(jsonData));
      return jsonData;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default FetchGameData;
