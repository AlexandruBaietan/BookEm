import { IsEmail, IsNotEmpty } from 'class-validator'
import { IUserCredentials, IUserDetails } from '../../core/interfaces/user'

interface ICreateUserData extends IUserCredentials, Partial<IUserDetails> {}
export class CreateUserDto implements ICreateUserData {
    id: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
