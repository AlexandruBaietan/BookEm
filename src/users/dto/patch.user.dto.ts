import { IUserCredentials, IUserDetails } from 'core/interfaces/user'
import { IsEmail, IsNotEmpty } from 'class-validator'
export interface IPatchUserData
    extends Partial<IUserCredentials>,
        Partial<IUserDetails> {}

export class PatchUserDto implements IPatchUserData {
    @IsEmail()
    @IsNotEmpty()
    email: string
}
