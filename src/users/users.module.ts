import { CreateUserDto, PutUserDto, PatchUserDto } from './dto/index'
import { UserRepository } from './module/users.repository'

class UsersDao {
    users: Array<CreateUserDto> = []

    async addUser(user: CreateUserDto) {
        return UserRepository.save({ ...user, permissionLevel: '1' })
    }

    async getUsers(limit: number, page: number) {
        return UserRepository.find({ take: limit, skip: limit * page })
    }

    async getUserById(userId: string) {
        return UserRepository.findOne({ where: { id: `${userId}` } })
    }

    async putUserById(userId: string, user: PutUserDto) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        )
        this.users.splice(objIndex, 1, user)
        return `${user.id} updated via put`
    }

    async patchUserById(userId: string, user: PatchUserDto) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        )
        const currentUser = this.users[objIndex]
        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel'
        ]
        for (const field of allowedPatchFields) {
            if (field in user) {
            }
        }
        this.users.splice(objIndex, 1, currentUser)
        return `${user.id} patched`
    }
    async removeUserById(userId: string) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        )
        this.users.splice(objIndex, 1)
        return `${userId} removed`
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex(
            (obj: { email: string }) => obj.email === email
        )
        let currentUser = this.users[objIndex]
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    }
}

export default new UsersDao()
