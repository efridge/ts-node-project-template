import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import express from "express";
import { AppController } from "./app.controller";

describe("AppController", () => {
  let app: any;
  let controller: AppController;

  // Run this code before every test
  beforeAll(() => {
    // Create a mock app instance with express in it
    app = {
      express: express(),
    };

    // Our controller instance to test
    controller = new AppController();

    // Use the controller's router for testing
    app.express.use(controller.router);
  });

  it("should return a welcome", async () => {
    return request(app.express)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
