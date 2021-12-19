import axios from "axios";

export const STORY = axios.create({
    baseURL: "https://story-learn.herokuapp.com",
});
