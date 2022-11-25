import { CreateUserDto, PutUserDto, PatchUserDto } from './dto'
import { UserRepository } from './repository'

class UsersRepository {
    users: Array<CreateUserDto> = []

    async addUser(user: CreateUserDto) {
        return (await UserRepository.save({ ...user, permissionLevel: '1' })).id
    }

    async getUsers(limit: number, page: number) {
        return UserRepository.find({ take: limit, skip: limit * page })
    }

    async getUserById(userId: string) {
        return await UserRepository.findOne({
            where: { id: userId }
        })
    }

    async getUserByEmailWithPassword(email: string) {
        return UserRepository.createQueryBuilder('user')
            .select([
                'user.id AS id',
                'user.email AS email',
                'user.password AS password',
                'user.permissionLevel '
            ])
            .where({ email: email })
            .execute()
    }

    async putById(userId: string, user: PutUserDto) {
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
        await UserRepository.delete(userId)
        return 'deleted' + userId
    }

    async getUserByEmail(email: string) {
        return UserRepository.findOne({ where: { email: email } })
    }
}

export default new UsersRepository()
