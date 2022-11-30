
import useSWR, { SWRConfiguration } from "swr"
import { ICountry } from '../interfaces';

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useCountries = () => {

    const { data, error } = useSWR<ICountry[]>('/api/countries', fetcher, {} );


    return {
        countries: data || [],
        isLoading: !error && !data,
        isError: error,
    }

}