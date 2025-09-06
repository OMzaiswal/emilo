import { atom } from "recoil";

export interface LoginState {
    isLoggedIn: boolean;
    fullName: string | null;
    email: string | null;
    username: string | null;
    profilePicture: string | null;
}

export const loginState = atom<LoginState>({
    key: 'loginState',
    default: {
        isLoggedIn: false,
        fullName: null,
        email: null,
        username: null,
        profilePicture: null
    }
})