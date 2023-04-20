import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constant";
import { RootState } from "..";
import { parseData } from "../../utils";
import { HomePageVideos } from "../../Type";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getSearchPageVideos = createAsyncThunk("youtubeApp/Search",
    async(isNext: boolean, {getState}) => {
        const {lunaticApp: {nextPageToken: nextPageTokenFromState, videos, searchTerm},} = getState() as RootState;
        const {data:{items,nextPageToken}} = await axios.get(`${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video${isNext ? `&pageToken=${nextPageTokenFromState}` : ""}`)
        const parsedData:HomePageVideos[] = await parseData(items)
        return {parsedData: [...videos, ...parsedData], nextPageToken}
    }
);