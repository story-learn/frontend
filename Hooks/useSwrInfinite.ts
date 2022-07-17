import { RefObject, useEffect, useRef, useState } from "react";
import { useOnScreen } from "./useOnScreen";
import useSWRInfinite from "swr/infinite";
import axios, { AxiosInstance } from "axios";
import useSWR from "swr";
import { returnUniqueArrayObject } from "../utilities/returnUniqueArrayObject";

const getKey = (
    pageIndex: number,
    previousPageData: any[] | null,
    baseUrl: string
) => {
    console.log({ pageIndex, previousPageData, baseUrl });
    if (previousPageData && !previousPageData.length) return null; // reached the end

    let searchUrl = new URL(baseUrl);
    searchUrl.searchParams.set("page", String(pageIndex + 1));

    let url = searchUrl.href;

    console.log({ getKey: url });

    return url;
};

const fetcher = async (url: string, axiosInstance?: AxiosInstance) => {
    try {
        // console.log({ fetchUrl: url });
        const res = await (await (axiosInstance || axios).get(url)).data;
        return res;
    } catch (error) {
        throw error;
    }
};

interface InfiniteResult<Data> {
    num_of_pages: number;
    previous: null | null;
    results: Data[];
}

interface Details<Data> {
    page: number;
    pages: number;
    results: Data[] | null;
}

export const useSwrInfiniteScroll = <Data>(
    ref: RefObject<HTMLDivElement>,
    baseUrl: string,
    axiosInstance?: AxiosInstance,
    page?: number,
    pages?: number
) => {
    const isVisible = useOnScreen(ref);
    const isFetching = useRef(false);
    const [details, setDetails] = useState<Details<Data>>({
        page: page || 1,
        pages: pages || 1,
        results: null,
    });

    const { data, error, isValidating, mutate } = useSWR(
        baseUrl,
        async (url: string) => {
            let searchUrl = new URL(url);
            searchUrl.searchParams.set("page", String(details.page));

            url = searchUrl.href;
            let result;

            // console.log({ url });

            try {
                isFetching.current = true;
                result = (await fetcher(
                    url,
                    axiosInstance
                )) as InfiniteResult<Data>;
            } catch (error) {
                throw error;
            } finally {
                isFetching.current = false;
            }

            return result;
        },
        { revalidateOnFocus: false }
    );

    useEffect(() => {
        if (!data) return;

        let { num_of_pages, results } = data;

        // console.log(results);

        results = (details.results || []).concat(results);
        results = returnUniqueArrayObject(
            [...(results as any)],
            "id"
        ) as Data[];

        setDetails((prev) => ({ ...prev, pages: num_of_pages, results }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        // console.log({
        //     isVisible,
        //     fetching: isFetching.current,
        //     cond: !isVisible || isFetching.current,
        // });

        // console.log({ isVisible, fetching: isFetching.current });

        if (isFetching.current || !isVisible) return;

        // last page
        if (details.page >= details.pages) return;

        setDetails((prev) => ({ ...prev, page: prev.page + 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    // fetch next page when user scrolls to bottom
    useEffect(() => {
        mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details.page]);

    useEffect(() => {
        setDetails({ page: 1, pages: 1, results: null });
    }, [baseUrl]);

    // console.log({ isValidating, error, loading: isFetching.current });
    // console.log({ page: details.page, pages: details.pages });
    return { ...details, isValidating, error, loading: isFetching.current };
};
