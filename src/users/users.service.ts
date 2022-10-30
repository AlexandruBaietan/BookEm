import UsersRepository from './users.repository'
import { CRUD } from 'core/interfaces/crud.interface'
import { PutUserDto, PatchUserDto, CreateUserDto } from './dto'

class UsersService implements CRUD {
    async create(resource: CreateUserDto) {
        return UsersRepository.addUser(resource)
    }

    async deleteById(id: string) {
        return UsersRepository.removeUserById(id)
    }

    async list(limit: number, page: number) {
        return UsersRepository.getUsers(limit, page)
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersRepository.patchUserById(id, resource)
    }

    async readById(id: string) {
        return UsersRepository.getUserById(id)
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersRepository.putById(id, resource)
    }

    async getUserByEmail(email: string) {
        return UsersRepository.getUserByEmail(email)
    }
    async getUserByEmailWithPassword(email: string) {
        return UsersRepository.getUserByEmailWithPassword(email)
    }
}

export default new UsersService()
