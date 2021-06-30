const axios = require("axios");
// import axios from "axios";
const MAX_SEARCH = 10;
const MAX_VIDEO_COUNT = 20;

const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const BASE_URL = "http://localhost:3000";
const KEY = "AIzaSyBSikAMN12xdJYKo5ehLIwZ8aHJarao9qI";
const getVideoInfo = async (videoId) => {
  const res = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: KEY,
      id: videoId,
      // part: "snippet,contentDetails,statistics",
      part: "snippet",
      maxResults: 1,
    },
  });
  return res.data.items[0].snippet;
};

const getVideoIdMultiList = async (channelId) => {
  let videoIdMultiList = [];
  let nextPageToken = "";
  let videoCount = 0;
  while (videoCount < MAX_VIDEO_COUNT) {
    const res = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: KEY,
        channelId: channelId,
        part: "snippet",
        order: "date",
        type: "video",
        maxResults: MAX_SEARCH,
        pageToken: nextPageToken,
      },
    });
    const itemList = res.data.items;
    const videoIdList = itemList.map((item) => {
      return item.id.videoId;
    });
    videoIdMultiList = [...videoIdMultiList, videoIdList];

    if (!res.data.nextPageToken) {
      break;
    }
    nextPageToken = res.data.nextPageToken;
    videoCount += videoIdList.length;
  }

  return videoIdMultiList;
};

const getVideoInfoList = async (videoIdMultiList) => {
  let videoInfoList = [];
  for (const videoIdList of videoIdMultiList) {
    const commaVideoIdList = videoIdList.join(",");
    const res = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: commaVideoIdList,
        part: "snippet,statistics",
        maxResults: MAX_SEARCH,
      },
    });

    const infoList = res.data.items.map((item) => {
      return {
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        commentCount: item.statistics.commentCount,
        videId: item.id,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
      };
    });

    videoInfoList = [...videoInfoList, ...infoList];
  }
  return videoInfoList;
};

async function main() {
  const videoId = "dVTLXKwgzjc";
  const videoInfo = await getVideoInfo(videoId);
  // console.log(videoInfo);
  const videoIdMultiList = await getVideoIdMultiList(videoInfo.channelId);
  // console.log(videoIdMultiList);

  const videoInfoList = await getVideoInfoList(videoIdMultiList);
  // console.log(videoInfoList);

  const youTubeInfo = {
    channelInfo: {
      channelId: videoInfo.channelId,
      channelTitle: videoInfo.channelTitle,
    },
    videoDataList: videoInfoList,
  };
  console.log(youTubeInfo);

  // console.log(JSON.stringify(await getVideoIdMultiList(channelId), null, 2));
}

main();
