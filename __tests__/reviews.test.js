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
            created_at: "2021-01-18T10:01:41.251Z",
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
            comment_count: 3,
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
            title: "Agricola",
            review_body: "Farmyard fun!",
            designer: "Uwe Rosenberg",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 1,
            category: "euro game",
            owner: "mallionaire",
            created_at: "2021-01-18T10:00:20.514Z",
            comment_count: 0,
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
        expect(reviews).toBeSortedBy("created_at", { coerce: true });
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
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });

  test("status 200: reviews are sorted alphabetically descending  by title ", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSorted({ descending: true });
        expect(reviews).toBeSortedBy("title", {
          coerce: true,
        });
      });
  });
  test("status 200: reviews are sorted by comment count", () => {
    return request(app)
      .get("/api/reviews?sort_by=comment_count")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("comment_count", {
          descending: true,
        });
      });
  });
  test("status 200: reviews are sorted ASC by default sort_by", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSorted({ ascending: true });
        expect(reviews).toBeSortedBy("created_at", {
          coerce: true,
        });
      });
  });
  test("status 200: reviews are sorted ASC by votes", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("votes");
        expect(reviews).toBeSorted({ ascending: true });
      });
  });
  test("status 200: reviews are filtered by category", () => {
    return request(app)
      .get("/api/reviews?category=euro%20game")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(1);
        expect(reviews[0].category).toBe('euro game')
      });
  });
  test("status 200: reviews are filtered by category, and ordered in asc order by votes", () => {
    return request(app)
      .get("/api/reviews?category=social%20deduction&order=asc&sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(11);
        expect(reviews).toBeSortedBy("votes");
        expect(reviews).toBeSorted({ ascending: true });
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              category:'social deduction'
            })
          )
        })
      });
  });

  test("status 400: responds with 'Bad Request' when invalid sort_by is passed", () => {
    return request(app)
      .get("/api/reviews?sort_by=number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 400: responds with 'Bad Request' when invalid order_by is passed", () => {
    return request(app)
      .get("/api/reviews?order=number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: responds with 'Not Found' when entered a non-existing category", () => {
    return request(app)
      .get("/api/reviews?category=number")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
