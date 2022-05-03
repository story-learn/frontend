import { useEffect, useState } from "react";
import { scrollBottom } from "../utilities/scrollBottom";
import { useFetch } from "./useFetch";
import useSWRInfinite from "swr/infinite";
import { AxiosInstance } from "axios";

export const useInfiniteScroll = <Data>(
    url: string | boolean,
    axiosInstance?: AxiosInstance,
    page?: number,
    pages?: number
) => {
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(pages || 1);
    const [totalData, setTotalData] = useState<any[]>([]);

    let infiniteUrl = currentPage <= totalPages && url;

    if (infiniteUrl) {
        let dataUrl = new URL(infiniteUrl as string);
        dataUrl.searchParams.set("page", String(currentPage));

        infiniteUrl = dataUrl.href;
    }

    let { data, error, loading } = useFetch<Data>(infiniteUrl, axiosInstance);

    // this might be in case of search page where there is no search url
    if (!infiniteUrl) loading = false;

    const handleScroll = () => {
        if (scrollBottom()) {
            // increase page
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // this is particularly useful for search page when the search query changes
    useEffect(() => {
        setCurrentPage(page || 1);
        setTotalPages(pages || 1);
        setTotalData([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        if (!data || !infiniteUrl) return;

        let newData = data as unknown as {
            num_of_pages: number;
            results: Data[];
        };

        let { num_of_pages: totalPages, results: fetchedData } = newData;

        setTotalData((prev) => [...prev, ...fetchedData]);
        setTotalPages(totalPages);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { currentPage, totalPages, totalData, loading, error };
};
