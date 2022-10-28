import { IUserCredentials, IUserDetails } from 'routes/core/interfaces/user'
import { ExtendTypes } from 'routes/core/interfaces/extention.interface'

export type CreateUserDto = IUserCredentials &
    Partial<IUserDetails> &
    ExtendTypes
