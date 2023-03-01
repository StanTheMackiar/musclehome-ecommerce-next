import { FC, PropsWithChildren } from 'react';
import { LangContext } from './';
import es_ES from '../../lang/es_ES.json';
import en_US from '../../lang/en_US.json';
import { useRouter } from 'next/router';
import { ILanguage } from '../../interfaces';

export type Lang = 'es' | 'en'

export const LangProvider: FC<PropsWithChildren> = ({ children }) => {

   const { locale } = useRouter();
   
   const selectLang: {"es": ILanguage, "en": ILanguage} = {
    "es": es_ES,
    "en": en_US,
   }

   const lang: ILanguage = selectLang[locale as Lang]


   return (
       <LangContext.Provider value={{
         lang,
       }}>
          { children }
       </LangContext.Provider>
   )
};