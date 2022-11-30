import { jwt } from "../utils";


export const isLogin = async(token: string): Promise<boolean> => {
    try {
        await jwt.isValidToken( token );
        return true;
    } catch (error) {
        return false;
    }
}