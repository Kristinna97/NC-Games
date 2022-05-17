const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
require("jest-sorted");

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
            review_id: 2,
            title: "Jenga",
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 5,
            category: "dexterity",
            owner: "philippaclaire9",
            created_at: "2021-01-18T10:01:41.251Z"
          })
          
        );
      });
  });
  test("status 200 , responds with the corresponding review based on the id provided with the review now including comment_count ", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 2,
            title: "Jenga",
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 5,
            category: "dexterity",
            owner: "philippaclaire9",
            created_at: "2021-01-18T10:01:41.251Z",
            comment_count:3
          })
          
        );
      });
  });
  test("status 200 , responds with review with correct id and with no comments (comment_count  = 0)", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 1,
            title: 'Agricola',
            review_body:'Farmyard fun!',
            designer: 'Uwe Rosenberg',
            review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            votes: 1,
            category: 'euro game',
            owner: 'mallionaire',
            created_at: "2021-01-18T10:00:20.514Z",
            comment_count:0
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
  test("status 400: responds with message 'Bad Request' when not passed an object with a value for inc_votes", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/reviews", () => {
  test("status 200 , responds with  an array of reviews objects ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(13);
        expect(reviews).toBeSorted({ descending: true });
        expect(reviews).toBeSortedBy("created_at", {coerce: true,});
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number)
            })
          );
        });
      });
  });
});
