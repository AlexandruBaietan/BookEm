import { IUserCredentials, IUserDetails } from 'core/interfaces/user'
import { ExtendTypes } from 'core/interfaces/extention.interface'

export type CreateUserDto = IUserCredentials &
    Partial<IUserDetails> &
    ExtendTypes
