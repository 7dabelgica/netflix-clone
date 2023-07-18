import fetcher from '@/lib/fetcher';
import UseSWR from 'swr';

const useMovieList = () => {
    const { data, isLoading, error } = UseSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
    }
};

export default useMovieList;