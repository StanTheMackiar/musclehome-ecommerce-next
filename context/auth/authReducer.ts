
import { IUserLogin } from '../../interfaces';
import { AuthState } from './';


type AuthActionType = 
   | { type: 'Auth - Login', payload: IUserLogin }


export const authReducer = ( state: AuthState, action: AuthActionType): AuthState => {

   switch (action.type) {
        case 'Auth - Login':
           return {
               ...state,
               isLoggedIn: true,
               user: action.payload
           }
            
       default:
           return state;
   }
}