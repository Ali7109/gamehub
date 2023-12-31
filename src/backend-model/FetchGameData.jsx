
const FetchGameData = async (type, parameters="") => {
  try {
    let cache = "";
    if(parameters === "" && !type.includes("/")){
      cache = localStorage.getItem(`${type}Data`);
    } else {
      if(!parameters.includes("&genres") && !type.includes("/"))
        cache = localStorage.getItem(`${parameters.substring(20, parameters.length - 1)}${type}Data`);
    }
     
    if (cache) {
      return JSON.parse(cache);
    } else {
      console.log("----- FETCHING FRESH DATA -----")
      const response = await fetch(`https://api.rawg.io/api/${type}?key=${process.env.REACT_APP_API_KEY}${parameters}`);
      const jsonData = await response.json();
      if(parameters === "" && !type.includes("/")){
        localStorage.setItem(`${type}Data`, JSON.stringify(jsonData));
      } else {
        if(!parameters.includes("&genres") && !type.includes("/"))
          localStorage.setItem(`${parameters.substring(20, parameters.length - 1)}${type}Data`, JSON.stringify(jsonData));
      }
      return jsonData;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
};

export default FetchGameData;
