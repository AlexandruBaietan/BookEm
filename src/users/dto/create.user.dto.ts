import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { IUserCredentials, IUserDetails } from '../../core/interfaces/user'

interface ICreateUserData extends IUserCredentials, Partial<IUserDetails> {}
export class CreateUserDto implements ICreateUserData {
    id: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Length(5)
    password: string
}
