import { CoreRoutesConfig } from '../core/core.routes.config'
import authController from './auth.controller'
import authMiddleware from './middleware/auth.middleware'
import express from 'express'
import { makeValidateBody } from 'express-class-validator'
import { AuthUserDto } from './dto/auth.dto'
import jwtMiddleware from './middleware/jwt.middleware'

export class AuthRoutes extends CoreRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes')
    }

    configureRoutes(): express.Application {
        this.app.post(
            `/auth`,
            makeValidateBody(AuthUserDto),
            authMiddleware.verifyUserPassword,
            authController.createJWT
        )

        this.app.post(
            `/auth/refresh-token`,
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT
        )
        return this.app
    }
}
