// Import the express and handlebars libraries
import express, { Application } from "express";
import { engine } from "express-handlebars";

// Import our routes (controllers and middleware)
import { AppController } from "./controllers/app.controller";
import { ErrorMiddleware } from "./middleware/error.middleware";

class App {
  // Create an instance of express, called "app"
  public app: Application = express();
  public port: number;

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

    this.initHandlebars();
    this.initWebRoutes();
    this.initMiddleware();
  }

  private initHandlebars() {
    // set up handlebars view engine, register w/ express
    this.app.engine(
      ".hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "main",
      })
    );
    this.app.set("view engine", ".hbs");
    this.app.set("views", "./views");
  }

  private initWebRoutes() {
    this.app.use(this.appController.router);
  }

  private initMiddleware() {
    this.app.use(this.errorMiddleware.router);
  }

  public listen() {
    // Tell express to start listening for requests on the port we specified
    this.app.listen(this.port, () => {
      console.log(
        `Express started on http://localhost:${this.port}; press Ctrl-C to terminate.`
      );
    });
  }
}

export default App;
