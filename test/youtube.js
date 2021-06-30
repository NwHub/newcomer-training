const axios = require("axios");

const MAX_SEARCH = 5;
const MAX_VIDEO_COUNT = 20;

const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const BASE_URL = "http://localhost:3000";
const KEY = "AIzaSyBSikAMN12xdJYKo5ehLIwZ8aHJarao9qI";

async function getVideoInfo(videoId) {
  let videoInfo;
  axios
    .get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: videoId,
        part: "snippet",
        maxResults: 1,
      },
    })
    .then(function (response) {
      videoInfo = response.data.items[0].snippet;
    })
    .catch(function (error) {
      console.log(error);
    });
  return videoInfo;
}

function getVideoIdMultiList(channelId) {
  let videoIdMultiList = [];
  let nextPageToken = "";
  let videoCount = 0;
  while (videoCount < MAX_VIDEO_COUNT) {
    let videoIdList = [];

    axios
      .get(`${BASE_URL}/search`, {
        params: {
          key: KEY,
          channelId: channelId,
          part: "snippet",
          order: "date",
          type: "video",
          maxResults: MAX_SEARCH,
          pageToken: nextPageToken,
        },
      })
      .then(function (response) {
        videoIdList = response.data.items.map((item) => item.id.videoId);
        nextPageToken = response.data.nextPageToken;
      })
      .catch(function (error) {
        console.log(error);
      });

    videoIdMultiList = [...videoIdMultiList, videoIdList];

    if (!nextPageToken) {
      break;
    } else {
      videoCount += videoIdList.length;
    }
  }

  return videoIdMultiList;
}

function getVideoInfoList(videoIdMultiList) {
  let responseVideoInfoList = [];
  for (const videoIdList of videoIdMultiList) {
    let videoInfoList = [];
    const commaVideoIdList = videoIdList.join(",");
    axios
      .get(`${BASE_URL}/videos`, {
        params: {
          key: KEY,
          id: commaVideoIdList,
          part: "snippet,statistics",
          maxResults: MAX_SEARCH,
        },
      })
      .then(function (response) {
        videoInfoList = response.data.items.map((item) => {
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
      })
      .catch(function (error) {
        console.log(error);
      });

    responseVideoInfoList = [...responseVideoInfoList, ...videoInfoList];
  }
  return responseVideoInfoList;
}

function main() {
  const videoId = "dVTLXKwgzjc";

  const videoInfo = getVideoInfo(videoId);
  // console.log(videoInfo);
  const videoIdMultiList = getVideoIdMultiList(videoInfo.channelId);
  // console.log(videoIdMultiList);

  const videoInfoList = getVideoInfoList(videoIdMultiList);
  // console.log(videoInfoList);

  const youTubeInfo = {
    channelInfo: {
      channelId: videoInfo.channelId,
      channelTitle: videoInfo.channelTitle,
    },
    videoDataList: videoInfoList,
  };
  console.log(youTubeInfo);

  // console.log(JSON.stringify(await getVideoIdList(channelId), null, 2));
}

main();
