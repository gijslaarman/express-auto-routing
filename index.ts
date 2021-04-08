import express, { Router } from "express";
import path from 'path';
import glob from "glob";

export class RouteHandler {
  private folder: string;
  private router: Router;

  constructor(folderLocation: string) {
    this.folder = path.join(__dirname, folderLocation);
    this.router = express.Router();
    this.bindRoutes();
  }

  private createEndpoints(routes: string[]) {
    return routes.map((route) => {
      return route
        .replace(this.folder, "")
        .replace("index.ts", "")
        .replace(".ts", "")
        .replace(/\[[\w]+\]/g, (match) => ":" + match.replace(/[\[\]]/g, ""));
    });
  }

  private bindRoutes() {
    glob(`${this.folder}/**/[!_]*.ts`, (error: Error, routes: string[]) => {
      if (error) throw error;
      const endpoints = this.createEndpoints(routes);
      routes.forEach((route, index) => {
        this.router.use(endpoints[index], require(route).default);
      });
    });
  }

  /**
   * getRouter
   */
  public Router() {
    return this.router;
  }
}

export default RouteHandler;
