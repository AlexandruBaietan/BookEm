import DbConnectionService from '../../core/services/connection.service'
import { Users } from './users.entity'

const userRepository =
    DbConnectionService.getDbConnection().getRepository(Users)

export { Users, userRepository }
