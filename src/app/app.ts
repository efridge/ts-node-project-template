// Import the express and pino (logger) libraries
import express, { Application } from "express";
import { pino } from 'pino';

// Import our code (controllers and middleware)
import { AppController } from "./controllers/app.controller";
import { ErrorMiddleware } from "./middleware/error.middleware";
import { HandlebarsMiddleware } from "./middleware/handlebars.middleware";

class App {
  // Create an instance of express, called "app"
  public app: Application = express();
  public port: number;
  private log: pino.Logger = pino();

  // Middleware and controller instances
  private errorMiddleware: ErrorMiddleware;
  private appController: AppController;

  constructor(port: number) {
    this.port = port;

    // Init the middlware and controllers
    this.errorMiddleware = new ErrorMiddleware();
    this.appController = new AppController();

    // Serve all static resources from the public directory
    this.app.use(express.static(__dirname + "/public"));

    // Set up handlebars for our templating
    HandlebarsMiddleware.setup(this.app);

    // Tell express what to do when our routes are visited
    this.app.use(this.appController.router);
    this.app.use(this.errorMiddleware.router);
  }

  public listen() {
    // Tell express to start listening for requests on the port we specified
    this.app.listen(this.port, () => {
      this.log.info(
        `Express started on http://localhost:${this.port}; press Ctrl-C to terminate.`
      );
    });
  }
}

export default App;
