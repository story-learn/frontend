import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useFetch = <Data>(url: string | boolean) => {
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

    // let { data, error } = useSWR((url as string) || null, fetcher);

    // let loading = !data && !error;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);

        fetch(url as string)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setError(null);
                setData(data);
            })
            .catch((err) => {
                setError("errr");
                setLoading(false);
            });
    }, [url]);

    return { data, error, loading };
};
