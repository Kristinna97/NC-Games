const app = require("../app");
const request = require("supertest");

describe("GET /api", () => {
  test("should return description of all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(Object.keys(endpoints).length).toEqual(9);
        expect(endpoints).toHaveProperty("GET /api");
        expect(endpoints).toHaveProperty("GET /api/categories");
        expect(endpoints).toHaveProperty("GET /api/reviews");
        expect(endpoints).toHaveProperty("GET /api/users");
        expect(endpoints).toHaveProperty("GET reviews/:review_id");
        expect(endpoints).toHaveProperty("GET reviews/:review_id/comments");
        expect(endpoints).toHaveProperty("PATCH reviews/:review_id");
        expect(endpoints).toHaveProperty("POST reviews/:review_id/comments");
        expect(endpoints).toHaveProperty("DELETE /api/comments/:comment_id");
      });
  });
});
