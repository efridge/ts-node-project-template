import { Request, Response, Router } from "express";

export class ErrorMiddleware {
  public router: Router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {

    // 404 catch-all handler (middleware)
    this.router.use((req: Request, res: Response) => {
      res.status(404);
      res.render("404");
    });

    // 500 error handler (middleware)
    this.router.use((err: Error, req: Request, res: Response) => {
      console.error(err.stack);
      res.status(500);
      res.render("500");
    });
  }
}
