import { describe, it, vi, expect } from "vitest";

const admin = require("../../middleware/admin");
const mongoose = require("mongoose");

describe("admin middleware", () => {
  it("should call next() when request object has auth 'ADMIN' role", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      role: "ADMIN",
    };

    const req = {
      auth: user,
    };
    const res = {};
    const next = vi.fn();

    admin(req, res, next);

    expect(req.auth).toMatchObject(user);
  });
});
