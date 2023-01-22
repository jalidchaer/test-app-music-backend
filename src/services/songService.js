const axios = require("axios");


let favorites = [];
const url = 'https://itunes.apple.com/search';

async function fetchApiData(term, limit=null){
    try{
        let response = await axios.get(url,{
        params: {
            term,
            limit
        }
      });

    return response.data;
   }catch(error){
    console.log(error);
   }
}

exports.getData = async(term) =>{
    let data = [];
    try {
      let response = await fetchApiData(term, 25);
      
      if(response){
        let albums = [];
        let songs = [];
        
        response.results.forEach(item => {
          
          let set = new Set(albums);
          
          if (!set.has(item.collectionName) && item.collectionName !== undefined) {
                albums.push(item.collectionName);
          }
            
            let song = {
                "cancion_id": item.trackId,
                "nombre_album": item.collectionName,
                "nombre_tema": item.trackName,
                "preview_url": item.previewUrl,
                "fecha_lanzamiento": item.releaseDate,
                "precio": {
                    "valor": item.trackPrice,
                    "moneda": item.currency,
                  }
                }
                songs.push(song);

            });

             data = { "total_albumes": albums.length, "total_canciones": songs.length, "albumes": albums, "canciones": songs }
        }

            return data;
      }catch (error) {
          throw "Error get data";
      }
    }


    exports.saveFavorites = async(params) => {
      const trackId = params.trackId;
      const name = params.name;
      const user = params.user;
      let saved = false;
     
      
     if(favorites.length){
      let selected = favorites.findIndex(data => data.user === user && data.trackId === trackId );
      if(selected!==-1){
       favorites.splice(selected, 1)
      }
     }
      try {
      
        let response = await fetchApiData(name);
         
        let result = response.results.filter((song) => { if (song.trackId == trackId) { return song } });
        if (result.length) {
         favorites.push(params);
         saved = true;
        }
        return { "result": favorites, "saved": saved};
        } catch (error) {
        throw "Error save data";
      }
     
    }
