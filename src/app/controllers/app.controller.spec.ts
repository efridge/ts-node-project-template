import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import express, { Application } from "express";
import { AppController } from "./app.controller";
import { HandlebarsMiddleware } from '../middleware/handlebars.middleware';

describe("AppController", () => {
  let app: Application;
  let controller: AppController;

  // Run this code before every test
  beforeAll(() => {
    // Create an express instance for testing
    app = express();

    // Set up handlebars for our templating
    HandlebarsMiddleware.setup(app);

    // Our controller instance to test
    controller = new AppController();

    // Load the controller's router for testing
    app.use(controller.router);
  });

  it("should return a welcome", async () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      });
  });
});
