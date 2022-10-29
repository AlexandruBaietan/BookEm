import UsersModule from './users.module'
import { CRUD } from 'core/interfaces/crud.interface'
import { PutUserDto, PatchUserDto, CreateUserDto } from './dto'

class UsersService implements CRUD {
    async create(resource: CreateUserDto) {
        return UsersModule.addUser(resource)
    }

    async deleteById(id: string) {
        return UsersModule.removeUserById(id)
    }

    async list(limit: number, page: number) {
        return UsersModule.getUsers(limit, page)
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersModule.patchUserById(id, resource)
    }

    async readById(id: string) {
        return UsersModule.getUserById(id)
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersModule.putUserById(id, resource)
    }

    async getUserByEmail(email: string) {
        return UsersModule.getUserByEmail(email)
    }
}

export default new UsersService()
