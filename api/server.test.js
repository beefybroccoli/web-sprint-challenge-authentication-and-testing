const request = require("supertest");
const app = require("../api/server");
const db = require("../data/dbConfig");

beforeAll( async()=>{
  await db.migrate.latest();
})

afterAll( async ()=>{
  await db.migrate.rollback();
})

describe('[1] - test /api/auth/register endpoint', ()=>{
  test("[1-1] - On SUCCESSFUL registration,  the response body should have `id`, `username` and `password`", async ()=>{
    const res = await request(app).post("/api/auth/register").send({username:"tomtom", password:"tomtom"});
    expect(res.body.username).toBe("tomtom");
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('password');
  })
  test('[1-2] - On FAILED registration due to `username` missing from the request body, the response body should include a string exactly as follows: "username and password required".', async ()=>{
    const res = await request(app).post("/api/auth/register").send({password:"tomtom"});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("username and password required");
  })
  test('[1-3] - On FAILED registration due to `password` missing from the request body, the response body should include a string exactly as follows: "username and password required".', async ()=>{
    const res = await request(app).post("/api/auth/register").send({username:"tomtom"});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("username and password required");
  })
  test('[1-4] - On FAILED registration due to the `username` being taken, the response body should include a string exactly as follows: "username taken".', async ()=>{
    const res = await request(app).post("/api/auth/register").send({username:"tomtom", password:"tomtom"});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("username taken");
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
})