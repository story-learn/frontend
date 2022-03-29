import axios from "axios";
import useSWR from "swr";

export const useSWRFetch = <Data>(url: string | boolean | undefined) => {
    const fetcher = async (url: string) => {
        try {
            let req = await axios.get<Data>(url);
            let data = await req.data;

            return data;
        } catch (error) {
            console.log("fetch cancelled");

            throw error;
        }
    };

    let { data, error } = useSWR((url as string) || null, fetcher);

    let loading = !data && !error;

    return { data, loading, error };
};
