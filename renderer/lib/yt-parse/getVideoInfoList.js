import { getVideoIdList } from "./getVideoIdList";
import { getVideoInfo } from "./getVideoInfo";

export const getVideoInfoList = async (url) => {
  const data = await getVideoIdList(url);

  if (data) {
    const { channelId, videoIdList } = data;

    if (Array.isArray(videoIdList)) {
      const videoInfoList = await Promise.all(
        videoIdList.map((el) => getVideoInfo(el))
      );
      const res = videoInfoList.map((el) => el.data);

      return { success: true, channelId, data: res };
    }
  }

  return { success: false };
};
