import express from 'express'
import cors from 'cors'

import { CoreRoutesConfig } from './routes/core/core.routes.config'
import { UserRoutes } from './routes/userRoutes/user.config'

const main = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    const routes: Array<CoreRoutesConfig> = []

    const userRoutes = new UserRoutes(app)
    routes.push(userRoutes)

    app.get('/', (req, res) => {
        res.send('Hello world')
    })

    app.listen(3000, () => {
        routes.forEach((route) => console.log(route.getName()))
    })
}

main()
