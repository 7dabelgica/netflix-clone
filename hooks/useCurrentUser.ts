import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const { data, mutate, isLoading, error } = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;