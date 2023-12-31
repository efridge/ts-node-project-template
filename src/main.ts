import App from "./app/app";

// Import dotenv and load the config
// TODO: finish setting this up
import dotenv from "dotenv";
dotenv.config();

// Choose the port number to run the app under
const port: number = Number(process.env.PORT) || 3000;

// Create a new app instance, tell it to start listening
const app = new App(port);
app.listen();
