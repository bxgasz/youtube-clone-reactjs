import { createAsyncThunk } from "@reduxjs/toolkit";
import { YOUTUBE_API_URL } from "../../utils/constant";
import axios from "axios";
import { convertRawViewstoString, timeSince } from "../../utils";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getVideoDetails = createAsyncThunk("youtubeApp/videoDetails",
    async(id: string) => {
        const {data: {items},} = await axios.get(`${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`)
        return parsedData(items[0]);
    }
)

const parsedData = async(items: {
    snippet: {
        channelId: string;
        title: string;
        description: string;
        publishedAt: Date;
        channelTitle: string;
    };
    id: string;
    statistics: {viewCount: string; likeCount: string}
}) => {
    const {data: {items: [
        {
            snippet: {
                thumbnails: {
                    default: {url: channelImage}
                }
            },
            statistics: {subscriberCount}
        }
    ]}} = await axios.get(`${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${items.snippet.channelId}&key=${API_KEY}`)

    return {
        videoId: items.id,
        videoTitle: items.snippet.title,
        videoDescription: items.snippet.description,
        videoViews: parseInt(items.statistics.viewCount).toLocaleString(),
        videoLikes: convertRawViewstoString(items.statistics.likeCount),
        videoAge: timeSince(new Date(items.snippet.publishedAt)),
        channelInfo: {
            id: items.snippet.channelId,
            image: channelImage,
            name: items.snippet.channelTitle,
            subscribers: convertRawViewstoString(subscriberCount, true),
          },
    }
}