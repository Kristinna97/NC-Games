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
              review_id: 2,
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

describe("POST /api/reviews/:review_id/comments", () => {
  test("status 200: responds newly added comment for the specific review", () => {
    const newComment = {
      username: "philippaclaire9",
      body: "New Comment for review 2",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: 7,
            body: "New Comment for review 2",
            votes: 0,
            author: "philippaclaire9",
            review_id: 2,
          })
        );
      });
  });
  test("status 400: responds with message 'Bad Request' when both mandatory keys are undefined", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 400: responds with message 'Bad Request' when one of mandatory keys is undefined", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ body: "comment body" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with message 'Not Found' when passed an id that doesnt match any review", () => {
    const newComment = {
      username: "philippaclaire9",
      body: "New Comment for review 2",
    };
    return request(app)
      .post("/api/reviews/999999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("status 400: responds with message 'Bad Request' when passed an invalid id format for review_id", () => {
    const newComment = {
      username: "philippaclaire9",
      body: "New Comment for review 2",
    };
    return request(app)
      .post("/api/reviews/notAnId/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with message 'Not Found' when a user thats not in the database tries to post a comment", () => {
    const newComment = {
      username: "kristina",
      body: "New Comment for review 2",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("status:204, responds with an empty response body", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
  test("status 404: responds with message' Not Found' when passed a non existing comment id", () => {
    return request(app)
      .delete("/api/comments/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("status 400: responds with message' Bad Request' when passed a wrong format id", () => {
    return request(app)
      .delete("/api/comments/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
