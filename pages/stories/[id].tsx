import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useFetch } from "../../Hooks/useFetch";

const Story: NextPage = () => {
    const { query } = useRouter();

    // const [storyId, setStoryId] = useState(query?.id as string);
    let storyId = query?.id;
    let storyUrl = storyId
        ? `${BASE_URLS.Story}${StoryRoutes.GET_STORY}/${storyId}`
        : false;

    let { data, error, loading } = useFetch(storyUrl);
    // console.log({ data, error, loading, storyUrl, storyId });

    return (
        <>
            <main>
                <div>Story Page -- ${storyId}</div>
                {/*  */}
            </main>
        </>
    );
};

export default Story;
