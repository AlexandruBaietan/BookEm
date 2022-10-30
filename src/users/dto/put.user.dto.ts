import { IUserCredentials, IUserDetails } from 'core/interfaces/user'
import { IsNotEmpty } from 'class-validator'
export interface IPutUserData extends IUserCredentials, IUserDetails {}

export class PutUserDto implements IPutUserData {
    id: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string
    permissionLevel: string
}
