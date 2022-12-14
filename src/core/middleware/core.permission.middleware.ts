import express from 'express'
import { PermissionFlag } from './core.permissionflag.enum'

class CommonPermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
        return (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const userPermissionFlags = parseInt(
                    res.locals.jwt.permissionFlags
                )
                if (userPermissionFlags & requiredPermissionFlag) {
                    next()
                } else {
                    res.status(403).send()
                }
            } catch (e) {
                console.warn(e)
            }
        }
    }

    async onlySameUserOrAdminCanDoThisAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags)
        if (
            req.params &&
            req.params.userId &&
            req.params.userId === res.locals.jwt.userId
        ) {
            return next()
        } else {
            if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
                return next()
            } else {
                return res.status(403).send()
            }
        }
    }
}

export default new CommonPermissionMiddleware()
