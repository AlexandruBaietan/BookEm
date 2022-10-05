import { CoreRoutesConfig } from "../core/core.routes.config";
import express from "express";

export class UserRoutes extends CoreRoutesConfig {
  constructor(app: express.Application) {
    super(app, "User Routes");
  }
}
