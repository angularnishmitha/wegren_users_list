import { IUser } from '../../interfaces/user.interface';

export interface IUserState {
    users: IUser[];
    isLoading: boolean;
}
