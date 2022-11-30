import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { AuthContext } from "../context";


type FormData = {
    email   : string,
    password: string,
 } 


export const useLogin = () => {

   const router = useRouter();
   const [ showError, setShowError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(false);
   const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();
   const { loginUser } = useContext(AuthContext);

   const destination = router.query.page?.toString() || '/';

   const onLoginUser = async( { email, password }: FormData ) => {   

      setShowError(false);
      setIsLoading(true);

      const isValidLogin = await loginUser( email, password );

      if ( !isValidLogin ) {
         setTimeout(() => {
            setShowError(true);
            setIsLoading(false);
            reset({password: ''});
            setTimeout(()=> setShowError(false), 3000);
         }, 2000);
         return;
      }

      setIsLoading(false);
      
      router.replace(destination)
   }

   return {
        destination,
        errors,
        isLoading,
        showError,

        // Methods
        handleSubmit,
        onLoginUser,
        register,
   }
}