import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { ILogin, IUserLogin } from '../../interfaces';
import { AuthContext,  authReducer } from './';
import shopApi from '../../api/shopApi';
import Cookies from 'js-cookie';
import axios from 'axios';
export interface AuthState {
    isLoggedIn: boolean,
    user?: IUserLogin,

}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE)


    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {

        try {
            const { data: { user, token } } = await shopApi.get<ILogin>('/user/validate');

            const newToken = token;
            Cookies.set('token', newToken)

            dispatch({type: 'Auth - Login', payload: user})

        } catch (error) {
            console.log(error);
            Cookies.remove('token');
        }
    }

    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await shopApi.post<ILogin>('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: 'Auth - Login', payload: user });
            return true;
            
        } catch (error) {
            return false;
        }
    }

    const registerUser = async( name: string, lastname: string, email: string, password: string ): Promise<{ hasError: boolean,  message ?: string}> => {
        try {
            const { data } = await shopApi.post<ILogin>('/user/register', { name, lastname, email, password });
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: 'Auth - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Algo salió mal, por favor intente de nuevo y si el error persiste contacte a administración'
            }
        }
    }


   return (
       <AuthContext.Provider value={{
         ...state,

        loginUser,
        registerUser,

       }}>
          { children }
       </AuthContext.Provider>
   )
};