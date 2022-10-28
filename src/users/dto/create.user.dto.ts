import { IUserCredentials, IUserDetails } from 'core/interfaces/user'
import { ExtendType } from 'core/interfaces/type.extention.interface'

export type CreateUserDto = IUserCredentials &
    Partial<IUserDetails> &
    ExtendType
