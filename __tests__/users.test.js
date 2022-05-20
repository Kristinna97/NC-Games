const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/users", () => {
  test("status 200 , responds with  an array of users objects ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/users/:username", () => {
  test("status 200 , responds with  user object with the spcific username", () => {
    return request(app)
      .get("/api/users/dav3rid")
      .expect(200)
      .then(({ body }) => {
        const { user} = body;    
        expect(user).toEqual(
            expect.objectContaining({
              username: 'dav3rid',
              name: 'dave',
              avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            })
          );
        
      });
  });
  test("status 404: responds with message' Not Found' when passed a username that doesnt exist", () => {
    return request(app)
      .get("/api/users/nonExistingUSername")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
