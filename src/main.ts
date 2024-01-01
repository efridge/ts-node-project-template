import App from "./app/app";

// Load values from our config.env file, if it exists
import dotenv from 'dotenv'; 
dotenv.config({path: (__dirname + "/config.env")}); 

// Choose the port number to run the app under
const port: number = Number(process.env.PORT) || 3000;

// Create a new app instance, tell it to start listening
const app = new App(port);
app.listen();
