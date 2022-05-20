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

describe("PATCH /api/comments/:comment_id", () => {
  test("status 200 , responds with the corresponding comment with incremented votes", () => {
    //INCREMENTING VOTES VALUE
    const newVotes = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/comments/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedComment } = body;
        expect(updatedComment).toEqual({
          comment_id: 2,
          body: 'My dog loved this game too!',
          votes: 14,
          author: 'mallionaire',
          review_id: 3,
          created_at: "2021-01-18T10:09:05.410Z",
        });
      });
  });
  test("status 200 , responds with the corresponding comment with decremented votes", () => {
    //DECREMENTING VOTES VALUE
    const newVotes = {
      inc_votes: -3,
    };
    return request(app)
      .patch("/api/comments/2")
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedComment } = body;
        expect(updatedComment).toEqual({
          comment_id: 2,
          body: 'My dog loved this game too!',
          votes: 10,
          author: 'mallionaire',
          review_id: 3,
          created_at: "2021-01-18T10:09:05.410Z",
        });
     
      });
  });
  test("status 404: responds with message 'Not Found' when passed an id that doesnt match any comments", () => {
    const newVotes = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/comments/999999")
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
      .patch("/api/comments/notAnId")
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
      .patch("/api/comments/2")
      .send(newVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 400: responds with message 'Bad Request' when not passed an object with a value for inc_votes", () => {
    return request(app)
      .patch("/api/comments/2")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  
});
