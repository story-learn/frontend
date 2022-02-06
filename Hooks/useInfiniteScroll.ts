import { useEffect, useState } from "react";
import { scrollBottom } from "../utilities/scrollBottom";
import { useFetch } from "./useFetch";
import useSWRInfinite from "swr/infinite";
import axios from "axios";

export const useInfiniteScroll = <Data>(
    url: string,
    page?: number,
    pages?: number
) => {
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(pages || 1);
    const [totalData, setTotalData] = useState<any[]>([]);

    let infiniteUrl = currentPage <= totalPages && url;

    if (infiniteUrl) {
        let dataUrl = new URL(infiniteUrl);
        dataUrl.searchParams.set("page", String(currentPage));

        infiniteUrl = dataUrl.href;
    }

    let { data, error, loading } = useFetch<Data>(infiniteUrl);

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

    useEffect(() => {
        if (!data) return;

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
