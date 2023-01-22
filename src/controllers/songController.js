const songService = require('../services/songService');
const redis = require("redis");
const e = require('express');

let redisClient;

(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Error: ${error}`));

    await redisClient.connect();
})();


exports.getData = async(req, res) => {
    const term = req.params.term;
    let result;
    let isCached = false;


    try {
        const cacheResults = await redisClient.get(term);
        if(cacheResults){
            isCached = true;
            result = JSON.parse(cacheResults);
        }else{

            result = await songService.getData(term);
            if(result.length === 0){
               throw "Data not found";
            }
   
            await redisClient.set(term, JSON.stringify(result), { EX: 3600});

        }
        res.send({
            fromCache: isCached,
            result
        })
         } catch (error) {
             res.status(404).send('Not found')
          }
    
}




exports.saveFavorites = async(req, res) => {
     const params = req.body;
     let result = await songService.saveFavorites(params);
     res.status(200).json(result);
    
}
