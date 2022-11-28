import { createContext } from 'react';
import { IUser, IUserLogin } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean,
    user?: IUserLogin,
    role?: 'client' | 'admin'

    loginUser: (email: string, password: string) => Promise<boolean>,
    registerUser: (name: string, lastname: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string;
    }>
}


export const  AuthContext = createContext({} as ContextProps);