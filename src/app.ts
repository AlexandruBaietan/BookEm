import express from 'express'
import cors from 'cors'

import { CoreRoutesConfig } from './core/core.routes.config'
import { UsersRoutes } from './users/users.config'

const main = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    const routes: Array<CoreRoutesConfig> = []

    const userRoutes = new UsersRoutes(app)
    routes.push(userRoutes)

    app.get('/', (req, res) => {
        res.send('Hello world')
    })

    app.listen(3000, () => {
        routes.forEach((route) => console.log(route.getName()))
    })
}

main()
