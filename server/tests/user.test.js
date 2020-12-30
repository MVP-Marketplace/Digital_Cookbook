const request = require("supertest");
const app = require("../app");

const { userOne, userTwo, setUpDatabase } = require("./fixtures/db");

beforeAll(setUpDatabase);

describe("open routes", () => {
    it("should sign up a new user", async () => {
         const response = await request(app)
         .post('/api/users')
         .send({
             name: userTwo.name,
             email: userTwo.email,
             password: userTwo.password,
             username: userTwo.username
         })
         .expect(201)

         expect(response.body).not.toBeNull();
         expect(response.body.name).toBe(userTwo.name)
         expect(response.body.email).toBe(userTwo.email)
         expect(response.body.username).toBe(userTwo.username)
         expect(response.body.password).not.toBe(userTwo.password)
         expect(response.body.tokens).not.toBe(userTwo.tokens)
   });
  });


