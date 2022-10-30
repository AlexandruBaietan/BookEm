import express from 'express'
import usersService from '../../users/users.service'
import * as argon2 from 'argon2'

export class AuthMiddleware {
    async verifyUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: any = await usersService.getUserByEmailWithPassword(
            req.body.email
        )
        if (user) {
            const passwordHash = user[0].password
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body = {
                    userId: user.id,
                    email: user.email,
                    permissionFlags: user.permissionFlags
                }
                return next()
            }
        }
        res.status(400).send({ errors: ['Invalid email and/or password'] })
    }
}

export default new AuthMiddleware()
