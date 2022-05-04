import axios, { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
// import useSWR from "swr";

export const useFetch = <Data>(
    url: string | boolean,
    axiosInstance?: AxiosInstance | null
) => {
    const fetcher = async () => {
        try {
            // url will be available because fetcher is called only when url is available
            url = url as string;
            let req = axiosInstance
                ? await axiosInstance.get(url)
                : await axios.get(url);
            let data = await req.data;
            return data;
        } catch (error) {
            console.log("fetch cancelled");

            throw error;
        }
    };

    // let { data, error } = useSWR((url as string) || null, fetcher);

    // let loading = !data && !error;

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        // if (!url || axiosInstance === null) return;
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                let data = await fetcher();
                setLoading(false);
                setData(data);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError("error");
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, error, loading };
};
