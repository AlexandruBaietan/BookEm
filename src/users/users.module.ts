import { CoreRoutesConfig } from '../core/core.routes.config'
import UsersController from './users.controller'
import UsersMiddleware from './middleware/users.middleware'
import express from 'express'
import { makeValidateBody } from 'express-class-validator'
import { CreateUserDto, PutUserDto, PatchUserDto } from './dto'
import jwtMiddleware from '../auth/middleware/jwt.middleware'
import permissionMiddleware from '../core/middleware/core.permission.middleware'
import { PermissionFlag } from '../core/middleware/core.permissionflag.enum'
export class UsersRoutes extends CoreRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.ADMIN_PERMISSION
                ),
                UsersController.listUsers
            )
            .post(
                makeValidateBody(CreateUserDto),
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            )

        this.app.param(`userId`, UsersMiddleware.extractUserId)
        this.app
            .route(`/users/:userId`)
            .all(
                UsersMiddleware.validateUserExists,
                permissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser)

        this.app.put(`/users/:userId`, [
            makeValidateBody(PutUserDto),
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put
        ])

        this.app.patch(`/users/:userId`, [
            makeValidateBody(PatchUserDto),
            UsersMiddleware.validatePatchEmail,
            UsersController.patch
        ])

        return this.app
    }
}
