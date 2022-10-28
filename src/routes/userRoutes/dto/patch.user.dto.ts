import { ExtendTypes } from 'routes/core/interfaces/extention.interface'
import { IUserCredentials, IUserDetails } from 'routes/core/interfaces/user'

export type PatchUserDto = Partial<IUserCredentials & IUserDetails> &
    ExtendTypes
