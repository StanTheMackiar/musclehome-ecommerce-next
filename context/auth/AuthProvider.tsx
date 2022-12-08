import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { ILogin, IUserLogged } from '../../interfaces';
import { AuthContext,  authReducer } from './';
import shopApi from '../../api/shopApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';


export interface AuthState {
    isLoggedIn: boolean,
    user?: IUserLogged,

}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

   const { data, status } = useSession();
   const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE)

    useEffect(() => {

        if ( status  === 'authenticated' ) {
            console.log(data.user)
            dispatch({type: 'Auth - Login', payload: data.user as IUserLogged})

        }
    }, [ status, data ]);

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

    const logOut = () => {
        Cookies.remove('cart');
        Cookies.remove('address')
        signOut();

        //EL token es manejado por next auth
        // Cookies.remove('token');
        // router.reload();
    }


   return (
       <AuthContext.Provider value={{
         ...state,

        loginUser,
        logOut,
        registerUser,

       }}>
          { children }
       </AuthContext.Provider>
   )
};