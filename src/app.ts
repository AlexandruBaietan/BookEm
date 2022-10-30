import express from 'express'
import cors from 'cors'
import { AuthRoutes } from './auth/auth.routes.module'

import { CoreRoutesConfig } from './core/core.routes.config'
import { UsersRoutes } from './users/users.module'

const main = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    const routes: Array<CoreRoutesConfig> = []

    const userRoutes = new UsersRoutes(app)
    const authRoutes = new AuthRoutes(app)

    routes.push(userRoutes)
    routes.push(authRoutes)

    app.listen(3000, () => {
        routes.forEach((route) => console.log(route.getName()))
    })
}

main()
