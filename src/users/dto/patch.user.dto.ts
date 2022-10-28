import { ExtendTypes } from 'core/interfaces/extention.interface'
import { IUserCredentials, IUserDetails } from 'core/interfaces/user'

export type PatchUserDto = Partial<IUserCredentials & IUserDetails> &
    ExtendTypes
