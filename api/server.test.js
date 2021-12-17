const request = require("supertest");
const { set } = require("../api/server");
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

describe('[2] - test /api/auth/login endpoint', ()=>{
  test("[2-1] - On SUCCESSFUL login, the response body should have `message` and `token`"
  , async ()=>{
    // {
    //   "message": "welcome, Captain Marvel",
    //   "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
    // }
    const res = await request(app).post("/api/auth/register").send({username:"tomtom", password:"tomtom"});
    const res2 = await request(app).post("/api/auth/login").send({username:"tomtom", password:"tomtom"});
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveProperty("message");
    expect(res2.body).toHaveProperty("token");
    expect(res2.body.message).toMatch(/welcome, tomtom/);
  })
  test('[2-2] - In order to log into an existing account the client must provide `username` and `password`. the response body should include a string exactly as follows: "username and password required"', async ()=>
  {
    const res1 = await request(app).post("/api/auth/login").send({username:"tomtom"});
    const res2 = await request(app).post("/api/auth/login").send({password:"tomtom"});
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty("message");
    expect(res1.body.message).toMatch(/username and password required/);
    expect(res2.status).toBe(400);
    expect(res2.body).toHaveProperty("message");
    expect(res2.body.message).toMatch(/username and password required/);
  })
  test('[2-3] - On FAILED login due to `username` not existing in the db, or `password` being incorrect,  the response body should include a string exactly as follows: "invalid credentials', async ()=>{
    const res1 = await request(app).post("/api/auth/login").send({username:"other", password:"tomtom"});
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty("message");
    expect(res1.body.message).toMatch(/invalid credentials/);
  })
})

describe('[3] - test /apijokes endpoint', ()=>{
  test('[3-1] - On valid token in the Authorization header, call next.', async ()=>{
    await request(app).post("/api/auth/register").send({username:"tomtom", password:"tomtom"});
    const res = await request(app).post("/api/auth/login").send({username:"tomtom", password:"tomtom"});
    const {token} = res.body;
    console.log("token = ", token);
    expect(res.body).toHaveProperty("token");
    const res2 = await request(app).get("/api/jokes").set('Authorization',token);
    expect(res2.body[0]).toHaveProperty('joke');
  })
  test('[3-2] - On missing token in the Authorization header, the response body should include a string exactly as follows: "token required".', async ()=>{
    const res2 = await request(app).get("/api/jokes");
    expect(res2.body.message).toMatch(/token required/);
  })
  test('[3-3] - On invalid or expired token in the Authorization header, the response body should include a string exactly as follows: "token invalid".', async ()=>{
    const res = await request(app).post("/api/auth/login").send({username:"tomtom", password:"tomtom"});
    const {token} = res.body;
    expect(res.body).toHaveProperty("token");
    const res2 = await request(app).get("/api/jokes").set('Authorization',token+"qq");
    expect(res2.body.message).toMatch(/token invalid/);

  })
})