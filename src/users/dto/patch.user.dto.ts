import { ExtendType } from 'core/interfaces/type.extention.interface'
import { IUserCredentials, IUserDetails } from 'core/interfaces/user'

export type PatchUserDto = Partial<IUserCredentials & IUserDetails> & ExtendType
