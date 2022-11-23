import { createContext } from "react";
import { ILanguage } from '../../interfaces';

interface LangContext {
    lang: ILanguage,
}

export const LangContext = createContext({} as LangContext);
