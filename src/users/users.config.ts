import { CoreRoutesConfig } from '../core/core.routes.config'
import UsersController from './users.controller'
import UsersMiddleware from './middleware/users.middleware'
import express from 'express'
import { makeValidateBody } from 'express-class-validator'
import { CreateUserDto } from './dto'

export class UsersRoutes extends CoreRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(UsersController.listUsers)
            .post(
                makeValidateBody(CreateUserDto),
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            )

        this.app.param(`userId`, UsersMiddleware.extractUserId)
        this.app
            .route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser)

        this.app.put(`/users/:userId`, [
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put
        ])

        this.app.patch(`/users/:userId`, [
            UsersMiddleware.validatePatchEmail,
            UsersController.patch
        ])

        return this.app
    }
}
