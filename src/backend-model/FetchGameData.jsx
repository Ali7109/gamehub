
const FetchGameData = async (type, parameters="") => {
  try {
    let cache = "";
    if(parameters === ""){
      cache = localStorage.getItem(`${type}Data`);
    } else {
      cache = localStorage.getItem(`highRated${type}Data`);
    }
     
    if (cache) {
      return JSON.parse(cache);
    } else {
      console.log("----- FETCHING FRESH DATA -----")
      const response = await fetch(`https://api.rawg.io/api/${type}?key=${process.env.REACT_APP_API_KEY}${parameters}`);
      const jsonData = await response.json();
      if(parameters === ""){
        localStorage.setItem(`${type}Data`, JSON.stringify(jsonData));
      } else {
        localStorage.setItem(`highRated${type}Data`, JSON.stringify(jsonData));
      }
      return jsonData;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default FetchGameData;
