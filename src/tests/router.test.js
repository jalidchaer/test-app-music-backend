const request = require('supertest');
const { response } = require('../app');
const app = require('../app');


describe('Get songs data', () => {

    it('it should return data from api', async() => {
        const term = "Radiohead";
        const response = await request(app).get(`/search-track/${term}`);
        expect(response.statusCode).toEqual(200);
        response.body.result.canciones.forEach((song) => {
            expect(song.preview_url).toBeDefined();
        })
    
    })

});

describe('post favorite song', () => { 
    it('it should save favorite song', async() => {  
        const params = { "trackId": "1010499559", "name": "Radiohead", "user":"Sebastian", "ranking":"5/5"};
        const response = await request(app).post('/favorites').send(params);
        expect(response.statusCode).toEqual(200);
        expect(response.body.saved).toBe(true);

    })

});
