import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { IUserCredentials, IUserDetails } from '../../core/interfaces/user'

interface IAuthData extends IUserCredentials, Partial<IUserDetails> {}
export class AuthUserDto implements IAuthData {
    id: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
