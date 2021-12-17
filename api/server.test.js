const request = require("supertest");
const app = require("../api/server");
const db = require("../data/dbConfig");

beforeAll(()=>{
  db.migrate.latest();
})

beforeEach(()=>{
  db.migrate.seed();
})

describe('[1] - test /api/auth/register endpoint', ()=>{
  test("[1] - On SUCCESSFUL registration,  the response body should have `id`, `username` and `password`", ()=>{
    // {
    //   "id": 1,
    //   "username": "Captain Marvel",
    //   "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
    // }', 
  

  })
  test('[1] - On FAILED registration due to `username` or `password` missing from the request body, the response body should include a string exactly as follows: "username and password required".', ()=>{

  })
  test('[1] - On FAILED registration due to the `username` being taken, the response body should include a string exactly as follows: "username taken".', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
})

describe('[1] - test /api/auth/login endpoint', ()=>{
  test("[1] - On SUCCESSFUL login, the response body should have `message` and `token`"
  , ()=>{
    // {
    //   "message": "welcome, Captain Marvel",
    //   "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
    // }

  })
  test('[1] - In order to log into an existing account the client must provide `username` and `password`. the response body should include a string exactly as follows: "username and password required"', ()=>{

  })
  test('[1] - On FAILED login due to `username` not existing in the db, or `password` being incorrect,  the response body should include a string exactly as follows: "invalid credentials', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
})

describe('[1] - test /apijokes endpoint', ()=>{
  test('[1] - ', ()=>{

  })
  test('[1] - On valid token in the Authorization header, call next.', ()=>{

  })
  test('[1] - On missing token in the Authorization header, the response body should include a string exactly as follows: "token required".', ()=>{

  })
  test('[1] - On invalid or expired token in the Authorization header, the response body should include a string exactly as follows: "token invalid".', ()=>{

  })
  test('[1] - ', ()=>{

  })
})