import axios from "axios";
import { BASE_URLS } from "../Constants";

export const STORY = axios.create({
    baseURL: BASE_URLS.Story,
});
