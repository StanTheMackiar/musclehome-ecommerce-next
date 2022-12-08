import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { AuthContext } from "../context";
import { signIn } from 'next-auth/react';



type FormData = {
    name        : string,
    lastname    : string,
    email       : string,
    password    : string,
    confPassword: string
    
 }

export const useRegister = () => {

   const router = useRouter();
   const { registerUser } = useContext(AuthContext)

   const [ showError, setShowError ] = useState(false)
   const [ errorDisplayed, setErrorDisplayed ] = useState('');
   const [ isLoading, setIsLoading ] = useState(false)

   const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();

   const destination = router.query.page?.toString() || '/';

   const onRegisterForm = async({name, lastname, email, password}: FormData ) => {

      setShowError(false)
      setIsLoading(true)
      const { hasError, message } = await registerUser(name, lastname, email, password);

      if ( hasError ) {
         setTimeout(() => {
            setShowError(true)
            setIsLoading(false)
            setErrorDisplayed( message! );
            setTimeout(()=> setShowError(false), 3000)
         }, 2000);
         return;
      }


      await signIn('credentials', { email, password });
      // router.replace(destination)
   }

   return {
        errorDisplayed,
        errors,
        isLoading,
        showError,
        destination,


        //Methods
        onRegisterForm,
        register,
        handleSubmit,
        getValues,
   }
}