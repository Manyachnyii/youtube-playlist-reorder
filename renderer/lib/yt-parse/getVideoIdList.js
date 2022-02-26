import ytpl from "ytpl";

export const getVideoIdList = async (url) => {
  const valid = ytpl.validateID(url);

  if (valid) {
    const playlistId = await ytpl.getPlaylistID(url);
    const videoList = await ytpl(playlistId, { limit: 40 });
    const videoIdList = videoList.items.map(({ id }) => id);
    const channelId = videoList.author.channelID;
    return { success: true, channelId, videoIdList };
  }

  return { success: false };
};
