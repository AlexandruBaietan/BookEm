import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Users } from '../../users/module/users.entity'

class DbConnectionService {
    private myDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'password',
        database: 'root',
        entities: [Users],
        logging: true,
        synchronize: true,
        subscribers: [],
        migrations: []
    })

    constructor() {
        this.connectWithRetry()
    }

    getDbConnection() {
        return this.myDataSource
    }

    connectWithRetry = () => {
        this.myDataSource
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!')
            })
            .catch((err) => {
                console.error('Error during Data Source initialization:', err)
            })
    }
}
export default new DbConnectionService()
