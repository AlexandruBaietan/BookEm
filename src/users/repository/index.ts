import DbConnectionService from '../../core/services/connection.service'
import { Users } from './users.entity'

const UserRepository =
    DbConnectionService.getDbConnection().getRepository(Users)

export { Users, UserRepository }
