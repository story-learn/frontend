import axios, { AxiosInstance } from "axios";
import useSWR from "swr";

export const useSWRFetch = <Data>(
    url: string | boolean | undefined,
    axiosInstance?: AxiosInstance | null
) => {
    const fetcher = async (url: string) => {
        try {
            // let req = await axios.get<Data>(url);
            let req = axiosInstance
                ? await axiosInstance.get<Data>(url)
                : await axios.get<Data>(url);
            let data = await req.data;

            return data;
        } catch (error) {
            console.log("fetch cancelled");

            throw error;
        }
    };

    // let { data, error } = useSWR((url as string) || null, fetcher, {
    let { data, error } = useSWR(
        axiosInstance !== null ? (url as string) : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    let loading = !data && !error;

    return { data, loading, error };
};
