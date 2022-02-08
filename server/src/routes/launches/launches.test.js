const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', ()=> {
    test("It should respond with 200 status", async ()=>{
        const response = await request(app)
        .get('/launches')
        .expect(200);        
    }); // test function to define test cases

})  // twe can create a test fixture with different test cases


describe('Test POST /launch', ()=>{
    const completeLaunchData = {
        mission: 'USS',
        rocket: 'NCC-1701',
        target: 'kepler-186F',
        launchDate: 'January 4th 2028'
    }
    
    const launchDataWithoutDate = {
        mission: 'USS',
        rocket: 'NCC-1701',
        target: 'kepler-186F',
    }

    test("It should respond with 201 status", async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        console.log(requestDate, responseDate);
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
        
    });

    test(" It should catch missing required property", ()=>{

    });

    test(" It should catch invalid dates", ()=>{
        
    });
});

// to test againt the API, we need to make a request to the API -- SUPERTEST