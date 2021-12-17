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
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
})

describe('[1] - test /api/auth/login endpoint', ()=>{
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
})

describe('[1] - test /apijokes endpoint', ()=>{
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
  test('[1] - ', ()=>{

  })
})