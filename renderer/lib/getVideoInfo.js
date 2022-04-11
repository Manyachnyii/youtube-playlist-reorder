import ytdl from "ytdl-core";

export const getVideoInfo = async (videoId) => {
  const valid = ytdl.validateID(videoId);

  if (valid) {
    const videoInfo = await ytdl.getBasicInfo(videoId);
    return { success: true, data: videoInfo };
  }

  return { success: false };
};
