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

describe("GET /api/reviews/:review_id", () => {
  test("status 200 , responds with the corresponding review based on the id provided ", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("status 400: responds with message' Bad Request' when passed an invalid review id", () => {
    return request(app)
      .get("/api/reviews/invalidId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

  test("status 404: responds with message' Not Found' when passed a non existing review id", () => {
    return request(app)
      .get("/api/reviews/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
describe("PATCH /api/reviews/:review_id", () => {
  test("status 200 , responds with the corresponding review with incremented votes", () => {
    //INCREMENTING VOTES VALUE
    const newVotes = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedReview } = body;
        expect(updatedReview).toEqual({
          review_id: 2,
          title: "Jenga",
          review_body: "Fiddly fun for all the family",
          designer: "Leslie Scott",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 6,
          category: "dexterity",
          owner: "philippaclaire9",
          created_at: "2021-01-18T10:01:41.251Z",
        });
      });
  });
  test("status 200 , responds with the corresponding review with decremented votes", () => {
    //DECREMENTING VOTES VALUE
    const newVotes = {
      inc_votes: -3,
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedReview } = body;
        expect(updatedReview).toEqual({
          review_id: 2,
          title: "Jenga",
          review_body: "Fiddly fun for all the family",
          designer: "Leslie Scott",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 2,
          category: "dexterity",
          owner: "philippaclaire9",
          created_at: "2021-01-18T10:01:41.251Z",
        });
      });
  });
  test("status 404: responds with message 'Not Found' when passed an id that doesnt match any review", () => {
    const newVotes = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/999999")
      .send(newVotes)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("status 400: responds with message 'Bad Request' when passed an invalid id format to the endpoint", () => {
    const newVotes = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/notAnId")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 400: responds with message 'Bad Request' when passed something not a number as a value of inc_votes", () => {
    const newVotes = {
      inc_votes: "one",
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
