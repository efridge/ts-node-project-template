// Import the express library
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Application,
} from "express";

// Import dotenv and load the config
import dotenv from "dotenv";
dotenv.config();

// Import the handlebars templating engine
import { engine } from "express-handlebars";

// Create an instance of express, called "app"
const app: Application = express();

// set up handlebars view engine, register w/ express
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// The default port will be 3000 unless otherwise specified
const port = process.env.PORT || 3000;

// Serve all static resources from the public directory
app.use(express.static(__dirname + "/public"));

// Serve the home page
app.get("/", (req: Request, res: Response) => {
  // Render the "home" template as HTML
  res.render("home");
  //res.send('Welcome to Express & TypeScript Server');
});

// 404 catch-all handler (middleware)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.render("404");
});

// 500 error handler (middleware)
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

// Tell express to start listening for requests
// on the port we specified
app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  );
});
