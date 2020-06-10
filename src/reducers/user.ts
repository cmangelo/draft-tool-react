import { userActionTypes } from '../actions/user';
import { User } from '../models/user.interface';

export interface UserState {
    isLoggedIn: boolean;
    user: User | undefined;
}

const initialState: UserState = {
    isLoggedIn: !!localStorage.getItem('user'),
    user: undefined
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case userActionTypes.USER_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true
            }
        case userActionTypes.USER_LOGGED_OUT:
            localStorage.removeItem('user');
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            const userAsString = localStorage.getItem('user');
            if (!userAsString)
                return state;

            const user = JSON.parse(userAsString) as User;
            return {
                ...state,
                user
            };
    }
}

export const getIsUserLoggedIn = (state: any) => state.user.isLoggedIn;