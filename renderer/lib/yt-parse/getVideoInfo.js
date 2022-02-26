import ytdl from "ytdl-core";

export const getVideoInfo = async (videoId) => {
  const valid = ytdl.validateID(videoId);

  if (valid) {
    const videoInfo = await ytdl.getBasicInfo(videoId);
    const { video_url, publishDate, description } = videoInfo.videoDetails;
    return { success: true, data: { video_url, publishDate, description } };
  }

  return { success: false };
};
