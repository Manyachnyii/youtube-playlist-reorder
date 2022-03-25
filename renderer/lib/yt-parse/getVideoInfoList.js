import { getVideoIdList } from "./getVideoIdList";
import { getVideoInfo } from "./getVideoInfo";

export const getVideoInfoList = async (url) => {
  const { channelId, videoIdList } = await getVideoIdList(url);

  if (channelId && Array.isArray(videoIdList)) {
    const videoInfoList = await Promise.all(
      videoIdList.map((el) => getVideoInfo(el))
    );

    const res = videoInfoList.map((el) => el.data);

    return { success: true, channelId, data: res };
  }

  return { success: false };
};
