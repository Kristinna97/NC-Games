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

describe("GET /api/reviews/:review_id/comments", () => {
    test("status 200 , responds with  an array of comments objects ", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(3);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                review_id: expect.any(Number)
              })
            );
          });
        });
    });
    test("status 404: responds with message' Not Found' when passed a non existing review id", () => {
        return request(app)
          .get("/api/reviews/999999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not Found");
          });
      });
      test("status 400: responds with message' Bad Request' when passed an invalid review id", () => {
        return request(app)
          .get("/api/reviews/invalidId/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
      test("status 200: responds with an empty array when the review doesnt have any comments", () => {
        return request(app)
          .get("/api/reviews/1/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;  
            expect(comments).toEqual([]);
          });
      });
    });
 