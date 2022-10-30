import { CreateUserDto, PutUserDto, PatchUserDto } from './dto'
import { UserRepository } from './repository'

class UsersRepository {
    users: Array<CreateUserDto> = []

    async addUser(user: CreateUserDto) {
        return UserRepository.save({ ...user, permissionLevel: '1' })
    }

    async getUsers(limit: number, page: number) {
        return UserRepository.find({ take: limit, skip: limit * page })
    }

    async getUserById(userId: string) {
        return UserRepository.createQueryBuilder('user')
            .select(['user.password', 'user.permissionLevel'])
            .where('user.id=:id', { id: userId })
            .getOne()
    }
    async getUserByEmailWithPassword(email: string) {
        return UserRepository.findOne({ where: { email: email } })
    }

    async UpdateUserById(userId: string, user: PutUserDto) {
        await UserRepository.createQueryBuilder('user')
            .update(user)
            .where('user.id=:id', {
                id: userId
            })
            .returning('*')
            .execute()
        return `${user.id} updated via put`
    }

    async patchUserById(userId: string, user: PatchUserDto) {
        await UserRepository.createQueryBuilder('user')
            .update(user)
            .where('user.id=:id', {
                id: userId
            })
            .returning('*')
            .execute()
        return `${userId} patched`
    }
    async removeUserById(userId: string) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        )
        this.users.splice(objIndex, 1)
        return `${userId} removed`
    }

    async getUserByEmail(email: string) {
        return UserRepository.findOne({ where: { email: email } })
    }
}

export default new UsersRepository()
