import { describe, it, vi, expect } from "vitest";

require("dotenv").config({ path: "./config/config.test.env" });

const { User } = require("../../models/User");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.auth with the payload of a valid access token", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "test",
      email: "test@gmail.com",
    };
    const token = new User(user).getToken();

    const req = {
      header: vi.fn().mockReturnValue(token),
    };
    const res = {};
    const next = vi.fn();

    auth(req, res, next);

    expect(req.auth).toMatchObject(user);
  });
});
