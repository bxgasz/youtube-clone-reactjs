import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constant";
import { RecommendedVideos } from "../../Type";
import { parseRecommendedData } from "../../utils";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getReccomendationVideos = createAsyncThunk("youtubeApp/getReccomendationVideos", 
    async(videoId: string, {getState}) => {
        const {lunaticApp: {currentPlaying: {channelInfo: {id: channelId}}}} = getState() as RootState
        const {data: {items},} = await axios.get(`${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`)
        const parsedData: RecommendedVideos[] = await parseRecommendedData(items,videoId)
        return {parsedData}
    }
)