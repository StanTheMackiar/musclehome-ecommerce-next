import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { getProviders, signIn } from "next-auth/react";


type FormData = {
    email   : string,
    password: string,
 } 


export const useLogin = () => {

   const router = useRouter();
   const [ showError, setShowError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(false);
   const { register, setFocus, reset, handleSubmit, formState: { errors } } = useForm<FormData>();
   const [providers, setProviders] = useState<any>({});

   const destination = router.query.page?.toString() || '/';

   useEffect(() => {
      getProviders().then( prov => {
         setProviders(prov)
      })
   }, []);

   const onLoginUser = async( { email, password }: FormData ) => {   

      setShowError(false);
      setIsLoading(true);

      const isValidLogin = await signIn('credentials', {
         email,
         password,
         redirect: false,
      });

      console.log(isValidLogin)

      if ( isValidLogin!.error ) {
         setTimeout(() => {
            setShowError(true);
            setIsLoading(false);
            reset({password: ''});
            setFocus('password')
            setTimeout(()=> setShowError(false), 3000);
         }, 2000);
         return;
      }

      router.replace(destination)
      router.reload();
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