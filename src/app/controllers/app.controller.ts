import { Request, Response, Router } from "express";

export class AppController {
  public router: Router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    // Serve the home page
    this.router.get("/", (req: Request, res: Response) => {
      // Render the "home" template as HTML
      res.render("home");
    });
  }
}
